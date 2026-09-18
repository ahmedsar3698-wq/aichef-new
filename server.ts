import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

// Middleware for parsing JSON with generous limit for base64 image uploads
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ extended: true, limit: "25mb" }));

// Lazy initialization for Gemini AI client
let aiClient: GoogleGenAI | null = null;
function getGeminiAI(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY || "";
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Health check endpoint
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", chef: "Ustad Bashir Chishti", language: "Roman Urdu" });
});

// AI Vision Ingredient Recognition & Recipe Recommendation API
app.post("/api/analyze-ingredients", async (req, res) => {
  try {
    const { imageBase64, mimeType = "image/jpeg", additionalItems = [] } = req.body;

    if (!imageBase64) {
      return res.status(400).json({
        error: "Tasveer (image) ki base64 string darkaar hai.",
      });
    }

    // Clean base64 string if data URI scheme was sent
    const cleanBase64 = imageBase64.replace(/^data:image\/[a-zA-Z0-9+.-]+;base64,/, "");

    const ai = getGeminiAI();

    const systemPrompt = `Aap ek tajrubakar Senior Desi Chef aur Food Recognition Expert hain jinka naam "Ustad Bashir Chishti" hai (42 saal purana khandani desi baawarchi khana).
Aapka mission:
1. Upload ki gayi tasveer ko gehrayi se analyze karein.
2. Sab se pehle faisla karein ke kya yeh tasveer kisi KHANA, sabzi, gosht, masalay, pantry item, ya food ingredient ki hai ya nahi.
3. CRITICAL RULE - Non-Food Verification:
   Agar tasveer kisi aisi cheez ki hai jo insaan nahi khaate (misal ke taur par mobile phone, electronics, joote, kapray, gari, furniture, kagaz, plastic, jaanwar jo khorak nahi, insan ka chehra baghair food ke):
   - "isFood" ko strictly false karein.
   - "detectedObject" mein bataiye ke tasveer mein kya cheez dikh rahi hai (Roman Urdu mein, e.g. "Mobile phone / smartphone", "Laptop computer", "Pao ke joote", etc.).
   - "rejectionMessage" mein bohot tameez aur wazahat se Roman Urdu mein user ko batayein ke yeh food ingredient nahi hai aur is se recipe nahi ban sakti. Misal: "Yeh tasveer food ya ingredient ki nahi lag rahi. Is mein humein ek mobile phone nazar aa raha hai, is liye is se recipe recommend nahi ki ja sakti. Meharbani farma kar apne kitchen ke sabziyan, gosht ya masalon ki tasveer upload karein!"
   - "recipes" array ko khali [] rakhein.
4. Agar tasveer kisi Food Item ya Ingredients ki hai:
   - "isFood" ko strictly true karein.
   - Tasveer mein mojood tamaam ingredients ko identify karein (tamatar, piyaz, lehsan, adrak, hari mirch, aloo, dhania, sabut masalay, gosht, paneer, waghera). Agar user ne additional ingredients provide kiye hain to unhein bhi include karein: ${JSON.stringify(additionalItems)}.
   - Har ingredient ka Roman Urdu naam, English naam, emoji, aur confidence fit percentage bataein.
   - "chefSummaryAdvice" mein Ustad Ji ke pyare aur mashfiqana andaaz mein Roman Urdu mein 2-3 jumlay likhein (e.g. "Mashallah! Aapke paas desi khaney ki bunyadi cheezein maujood hain...").
   - "recipes" mein 2 se 3 authentic, lajawab Pakistani aur Indian recipes recommend karein jo in mojooda ingredients ko behtareen tareeqay se istemaal karein.
   - Prioritize:
     * 🇵🇰 Pakistani recipes (Karahi, Handi, Salan, Biryani/Pulao, Dhaba style)
     * 🇮🇳 Indian recipes (Paneer dishes, Makhani gravies, Dal tadka, Sabzi)
     * Traditional home-style, practical, and beginner friendly.
   - Har recipe ke liye:
     * name: Roman Urdu / English popular name (e.g. "Authentic Shinwari Chicken Karahi")
     * nativeName: Urdu rasm-ul-khat name (optional, e.g. "شنواری چکن کڑاہی")
     * cuisine: "Pakistani" ya "Indian" ya "Both"
     * category: "Karahi", "Handi", "Vegetarian", "Curry", "Rice"
     * isVegetarian: boolean
     * shortDescription: Roman Urdu mein lazeez wazahat
     * prepTime: e.g. "15 Min"
     * cookTime: e.g. "25 Min"
     * difficulty: "Aasan" ya "Darmiyani" ya "Mushkil"
     * servings: e.g. "3-4 Log"
     * ingredientsRequired: mukammal list miqdaar ke sath
     * detectedIngredientsUsed: tasveer se istemaal honay walay items
     * missingIngredients: pantry items jo user ko chaiyen (namak, tail waghera)
     * instructions: step-by-step array of { stepNumber: number, title: string, description: string } Roman Urdu mein bilkul aasan zuban mein
     * chefTips: Ustad Ji ka khaas nuskha (secret cooking tip in Roman Urdu)
     * substitutions: array of { missingItem: string, substitute: string } (e.g. agar dahi na ho to leemo ka ras)
     * imageUrl: appropriate dish visual tag

ZUBAN KI HIDAYAT:
Poora response sirf aur sirf aasan aur natural Roman Urdu mein hona chahiye. Mushkil ya kitabi alfaz ke bajaye aam bol chaal ki Roman Urdu istemaal karein.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: {
        parts: [
          {
            inlineData: {
              data: cleanBase64,
              mimeType: mimeType || "image/jpeg",
            },
          },
          {
            text: "Baraye meherbani is tasveer ko analyze karein aur agar yeh khana/ingredients hain to Pakistani aur Indian recipes Roman Urdu mein tajweez karein. Agar khana nahi hai to wazahat karein.",
          },
        ],
      },
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            isFood: {
              type: Type.BOOLEAN,
              description: "True if the image contains food or cooking ingredients, false if non-food object.",
            },
            detectedObject: {
              type: Type.STRING,
              description: "Name of the detected object in Roman Urdu.",
            },
            rejectionMessage: {
              type: Type.STRING,
              description: "Polite rejection message in Roman Urdu if not food.",
            },
            detectedIngredients: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  nameUrdu: { type: Type.STRING },
                  nameEnglish: { type: Type.STRING },
                  emoji: { type: Type.STRING },
                  confidence: { type: Type.NUMBER },
                  fitPercentage: { type: Type.NUMBER },
                  category: { type: Type.STRING },
                },
                required: ["nameUrdu", "nameEnglish", "emoji", "confidence", "fitPercentage"],
              },
            },
            chefSummaryAdvice: {
              type: Type.STRING,
              description: "Ustad Ji's friendly vocal summary advice in Roman Urdu.",
            },
            recipes: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  name: { type: Type.STRING },
                  nativeName: { type: Type.STRING },
                  cuisine: { type: Type.STRING, enum: ["Pakistani", "Indian", "Both"] },
                  category: { type: Type.STRING },
                  isVegetarian: { type: Type.BOOLEAN },
                  shortDescription: { type: Type.STRING },
                  prepTime: { type: Type.STRING },
                  cookTime: { type: Type.STRING },
                  difficulty: { type: Type.STRING, enum: ["Aasan", "Darmiyani", "Mushkil"] },
                  servings: { type: Type.STRING },
                  badge: { type: Type.STRING },
                  ingredientsRequired: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                  detectedIngredientsUsed: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                  missingIngredients: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                  instructions: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        stepNumber: { type: Type.INTEGER },
                        title: { type: Type.STRING },
                        description: { type: Type.STRING },
                      },
                      required: ["stepNumber", "title", "description"],
                    },
                  },
                  chefTips: { type: Type.STRING },
                  substitutions: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        missingItem: { type: Type.STRING },
                        substitute: { type: Type.STRING },
                      },
                      required: ["missingItem", "substitute"],
                    },
                  },
                },
                required: [
                  "id",
                  "name",
                  "cuisine",
                  "shortDescription",
                  "prepTime",
                  "cookTime",
                  "difficulty",
                  "servings",
                  "ingredientsRequired",
                  "instructions",
                  "chefTips",
                ],
              },
            },
          },
          required: ["isFood", "detectedIngredients", "recipes"],
        },
      },
    });

    let textOutput = (response.text || "{}").trim();
    // Strip markdown code fences if present
    if (textOutput.startsWith("```")) {
      textOutput = textOutput.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "").trim();
    }

    let parsedData: any;
    try {
      parsedData = JSON.parse(textOutput);
    } catch (parseErr) {
      // Attempt regex extraction of the first JSON object
      const jsonMatch = textOutput.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsedData = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("AI response format was not valid JSON");
      }
    }

    // Fallback image urls for recipes based on cuisine and category
    if (parsedData.recipes && Array.isArray(parsedData.recipes)) {
      parsedData.recipes = parsedData.recipes.map((recipe: any, index: number) => {
        let defaultImage = "https://lh3.googleusercontent.com/aida-public/AB6AXuBK6RmfmP4CEWzNhzPzX8L_m8u88Kmnaj4UR2PGjsu8PmhcxIFXWDISvQDzZvthPliWvjYzBoDYUzygTGA3VWjysMHCow5w3zp2MCHVQDTNASDPGclHt15gfsmPFIW1EODAaTmK-0J81eEU2u_5SNn6ICkFk4jsO96w4VQEQ7jjMV4YvtP9rCXtKldXBeweapa7-kEH-UAaFYBqdcfi20UfChFtUtvZWThwEMe_TKD2cVe0Y7nGSThwUQ";
        if (recipe.isVegetarian || recipe.name.toLowerCase().includes("paneer")) {
          defaultImage = "https://lh3.googleusercontent.com/aida-public/AB6AXuCWwi1oYcGXjnfxX9YNyCzw23sDfEM6u9GfChyRBijyixkXWdDANEEcto_pE8s0qEOjwc1rt3Nwds5PsWUrmSKfj49t6HmlXpnZlUbkpFNhp1RMccPHvFGdntzctoZNg-BHG-U17At7va7Kx8ZbySTENAuotvUGDKGPoeqJneghTk2rT2lxi-sOCavDRSxYz29SSuRTnPo1S7Xz0DSupeAvf8FPY-v_tyw9xwdwuG3DEhnZq1157qR4Aw";
        } else if (recipe.name.toLowerCase().includes("aloo") || index === 2) {
          defaultImage = "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1000&q=80";
        }
        return {
          ...recipe,
          imageUrl: recipe.imageUrl || defaultImage,
        };
      });
    }

    return res.json(parsedData);
  } catch (error: any) {
    console.error("AI Analysis Error:", error);
    return res.status(500).json({
      error: "AI Vision analysis mein masla paish aaya. Baraye meherbani dobara koshish karein.",
      details: error?.message || String(error),
    });
  }
});

// Chat with Senior Chef (Ustad Bashir Chishti)
app.post("/api/ask-chef", async (req, res) => {
  try {
    const { question, currentIngredients = [] } = req.body;

    if (!question) {
      return res.status(400).json({ error: "Sawaal darkaar hai." });
    }

    const ai = getGeminiAI();

    const systemPrompt = `Aap "Ustad Bashir Chishti" hain, ek nihayat shafiq, pur-khuloos aur 42 saal ka tajruba rakhne walay Senior Pakistani & Indian Desi Chef.
Aapka lehja nihayat meetha, respectful (Aap, Janab, Mashallah, Subhanallah), aur practical desi kitchen tips se bharpoor hai.
User aapse khaney pakanay, masalon ke mutabaadul, gosht galane, ya kisi recipe ke baray mein sawal pooch raha hai.
Aapka jawab mukammal taur par aasan aur dil-chasp Roman Urdu mein hona chahiye (2 se 4 mukhtasar paragraphs mein).
Agar kitchen mein koi cheez kharab hone ka khadsha ho to fauri desi tod ya totka zaroor batayein.`;

    const userPrompt = `User ka Sawaal: "${question}"
Mojooda Kitchen Ingredients: ${JSON.stringify(currentIngredients)}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
      },
    });

    return res.json({
      answer: response.text || "Mashallah! Khana dil se banayein to har luqma lajawab banta hai. Koi aur sawaal ho to zaroor poochein!",
    });
  } catch (error: any) {
    console.error("Ask Chef Error:", error);
    return res.status(500).json({
      error: "Ustad ji se rabita na ho saka. Baraye meherbani thori der baad dobara koshish karein.",
      details: error?.message,
    });
  }
});

// Vite middleware or production static files
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Pakwan AI Server chal raha hai: http://0.0.0.0:${PORT}`);
  });
}

startServer();
