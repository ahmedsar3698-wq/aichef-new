import { AnalysisResponse, Recipe } from '../types';

export const APP_IMAGES = {
  logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMWkR6OotenENKL5CwE_VbCuufr39aIxgH3nnKxLsC9FnQRpBBKA8smwuWMO_z3JswCLEHvODCdaHvIShxekpW4am6tdSSK491WVqzC_Qnc5uZ5t5qDbIAiQueyKH9I_URTu1RsmooPhVtRpuzVowPgF1-8Wdwk6WyrHTbskd1tLGm1-KFdQTIfgGpD3oLhv4Vtsp4MR1GRmyuoJ2XOgSy0B0vMnrGNphbxrqnkqFpJucvNO9VBGz38Q',
  paneerDish: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWwi1oYcGXjnfxX9YNyCzw23sDfEM6u9GfChyRBijyixkXWdDANEEcto_pE8s0qEOjwc1rt3Nwds5PsWUrmSKfj49t6HmlXpnZlUbkpFNhp1RMccPHvFGdntzctoZNg-BHG-U17At7va7Kx8ZbySTENAuotvUGDKGPoeqJneghTk2rT2lxi-sOCavDRSxYz29SSuRTnPo1S7Xz0DSupeAvf8FPY-v_tyw9xwdwuG3DEhnZq1157qR4Aw',
  chickenKarahi: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBK6RmfmP4CEWzNhzPzX8L_m8u88Kmnaj4UR2PGjsu8PmhcxIFXWDISvQDzZvthPliWvjYzBoDYUzygTGA3VWjysMHCow5w3zp2MCHVQDTNASDPGclHt15gfsmPFIW1EODAaTmK-0J81eEU2u_5SNn6ICkFk4jsO96w4VQEQ7jjMV4YvtP9rCXtKldXBeweapa7-kEH-UAaFYBqdcfi20UfChFtUtvZWThwEMe_TKD2cVe0Y7nGSThwUQ',
  ingredientsTable: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZMLtbAcGLIFLO4_JI7Gc2xOAxFzlB-hUTNV7slzVcOCzWoSo-yj0ElnGgYjS_pM9DbjrQ3OPkqR2Brd36yYZRlFpIfRbzump4-u6Pmg-gpqHZBPGZn1N2bg9ffY02Mdmejn9rzexnBpjYDuYPptx2NF7O_jWfDQJ5Wd3lxNKEwWghF6Ga8JA8msvwyUO2Xx5z_tr6TDfcoontJ5D8IrzyQ2SGDrcJFF5ZJLL70o79fbt_8J9kfHivvA',
  nonFoodPhone: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1000&q=80',
  alooJeera: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1000&q=80',
  daalTadka: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1000&q=80',
};

export const DEFAULT_RECIPES: Recipe[] = [
  {
    id: 'shinwari-chicken-karahi',
    name: 'Authentic Shinwari Chicken Karahi (Dhaba Style)',
    nativeName: 'شنواری چکن کڑاہی',
    cuisine: 'Pakistani',
    category: 'Karahi',
    isVegetarian: false,
    shortDescription: 'Bina pyaz aur bina lal mirch ke banne wali mashhoor Pashtun karahi jo sirf tamatar, hari mirch aur kutti kali mirch par banti hai.',
    prepTime: '15 Min',
    cookTime: '25 Min',
    difficulty: 'Aasan',
    servings: '3-4 Log',
    badge: '🇵🇰 Pakistani Dhaba Specialty',
    isPopular: true,
    imageUrl: APP_IMAGES.chickenKarahi,
    ingredientsRequired: [
      'Murgh Gosht (Chicken): 750 grams',
      'Taaza Tamatar: 5-6 adad darmiyanay',
      'Lehsan & Adrak Paste: 2 khaney ke chamach',
      'Taaza Hari Mirchein: 4-5 adad lambi kati hui',
      'Kutti Hui Kali Mirch: 1 chamach taaza peesi hui',
      'Zeera Powder: 1 chhota chamach',
      'Cooking Oil / Desi Ghee: aadha cup',
      'Namak: Hasb-e-Zaiqa (1 chhota chamach)',
      'Taaza Dhania aur Adrak Julienne (Garnish ke liye)'
    ],
    detectedIngredientsUsed: [
      'Taaza Tamatar (Tomatoes)',
      'Lehsan & Adrak (Garlic & Ginger)',
      'Hari Mirchein (Green Chilies)',
      'Dhania (Fresh Cilantro)',
      'Sabut Masalay (Whole Spices)'
    ],
    missingIngredients: ['Chicken Gosht', 'Cooking Oil / Ghee', 'Namak'],
    instructions: [
      {
        stepNumber: 1,
        title: 'Tail aur Lehsan Adrak Ka Tarka',
        description: 'Karahi mein tail garam karein aur lehsan adrak ka paste daal kar 1 minute bhoonein taakay pyaari khushbu aana shuru ho jaye.'
      },
      {
        stepNumber: 2,
        title: 'Chicken Gosht Ki Bhoonai',
        description: 'Chicken shamil karein aur tez aanch par tab tak fry karein jab tak gosht ka rang safaid aur halka sunhari na ho jaye (takreeban 5-7 minute).'
      },
      {
        stepNumber: 3,
        title: 'Tamatar Dum Par Galayein',
        description: 'Tamatar ko do hisson mein kaat kar karahi par ulta rakh dein aur dhakkan band karke 5 minute pakne dein. Phir chimtay se chilkay utaar lein aur chammach se pees dein.'
      },
      {
        stepNumber: 4,
        title: 'Tez Aanch Par Bhunai & Masalay',
        description: 'Kutti hui kali mirch, zeera aur hari mirchein daal kar tez aanch par bhoonai karein jab tak tail gravy se alag na ho jaye.'
      },
      {
        stepNumber: 5,
        title: 'Garnish & Garam Garam Peshkash',
        description: 'Upar se baareek kata hua adrak aur taaza dhania chhirak kar garam garam naan ya rogni chapati ke sath dastarkhwan par serve karein.'
      }
    ],
    chefTips: '“Shinwari mein kabhi bhi lal mirch ya dahi na daalein! Iska asli roshan rang aur makhsoos swaad sirf taaza tamatar aur kaali mirch se nikalta hai.”',
    substitutions: [
      {
        missingItem: 'Agar Chicken Na Ho',
        substitute: 'Mutton Gosht (pehle ubaal lein) ya Aloo Paneer cubes'
      },
      {
        missingItem: 'Agar Desi Ghee Na Ho',
        substitute: 'Aam Cooking Oil ya thora sa Makhan mix karein'
      }
    ]
  },
  {
    id: 'paneer-butter-masala',
    name: 'Restaurant-Style Paneer Butter Masala (Makhani Handi)',
    nativeName: 'پنیر بٹر مصالحہ',
    cuisine: 'Indian',
    category: 'Handi',
    isVegetarian: true,
    shortDescription: 'Makhan, taaza tamatar aur shahi masalon se lutf-andooz hone wali silki gravy jise tandoori naan ke sath parosa jata hai.',
    prepTime: '10 Min',
    cookTime: '20 Min',
    difficulty: 'Darmiyani',
    servings: '4 Log',
    badge: '🇮🇳 Indian Royal Classic',
    isPopular: true,
    imageUrl: APP_IMAGES.paneerDish,
    ingredientsRequired: [
      'Paneer Cubes: 300 grams (taaza narm)',
      'Taaza Tamatar: 4 adad (puree banai hui)',
      'Piyaz: 2 adad bareek chopped',
      'Lehsan & Adrak Paste: 1 bara chamach',
      'Makhan (Butter): 2 bare chamach',
      'Cooking Oil: 1 bara chamach',
      'Heavy Cream ya Malai: 3 chamach',
      'Kasuri Methi: 1 chhota chamach (hath se masal kar)',
      'Garam Masala & Kashmiri Lal Mirch: 1 chhota chamach'
    ],
    detectedIngredientsUsed: [
      'Taaza Tamatar (Tomatoes)',
      'Piyaz (Onions)',
      'Lehsan & Adrak (Garlic & Ginger)',
      'Hari Mirchein (Green Chilies)',
      'Sabut Masalay'
    ],
    missingIngredients: ['Paneer Cubes', 'Makhan / Butter', 'Cream / Doodh'],
    instructions: [
      {
        stepNumber: 1,
        title: 'Makhani Masala Base Tayyar Karein',
        description: 'Pan mein thora sa tail aur makhan garam karein. Khushbudar sabut masalay aur pyaz daal kar translucent hone tak saute karein.'
      },
      {
        stepNumber: 2,
        title: 'Tamatar & Masalon Ki Pakaayi',
        description: 'Lehsan adrak paste aur tamatar puree shamil karein. Haldi, Kashmiri lal mirch aur namak daal kar tel alag hone tak bhoonein.'
      },
      {
        stepNumber: 3,
        title: 'Silky Gravy & Cream Shamil Karein',
        description: 'Aanch dheemi karein aur taaza malai ya cream shamil karein. Halkay haath se chalayein taakay gravy makhmali ho jaye.'
      },
      {
        stepNumber: 4,
        title: 'Paneer Cubes & Kasuri Methi',
        description: 'Paneer ke tukray gravy mein daalein. Hath se masli hui kasuri methi aur garam masala chhirak kar sirf 3-4 minute dheemi aanch par pakayein.'
      },
      {
        stepNumber: 5,
        title: 'Shahi Sajaawat & Parosna',
        description: 'Garam garam handi mein thora sa makhan aur cream ki dhaar daal kar tandoori naan ke sath garma garam dastarkhwan par parosein.'
      }
    ],
    chefTips: '“Paneer ko gravy mein daal kar zyada der pakaane ki ghalti hargiz na karein, warna paneer rubber jaisa sakht ho jata hai. Sirf 3 minute dum kafi hai.”',
    substitutions: [
      {
        missingItem: 'Agar Paneer Na Ho',
        substitute: 'Uble hue aloo ke bare tukray (Aloo Makhani) ya Fried Tofu'
      },
      {
        missingItem: 'Agar Heavy Cream Na Ho',
        substitute: 'Ghar ke uble doodh ki taaza malai ya Kaju ka paste'
      },
      {
        missingItem: 'Agar Kasuri Methi Na Ho',
        substitute: 'Taaza kata hua sabz dhania aur thora sa bhuna zeera powder'
      }
    ]
  },
  {
    id: 'aloo-jeera-dhaba',
    name: 'Chatpate Dhaba Aloo Jeera Bhujia',
    nativeName: 'دھابہ آلو زیرہ بھجیا',
    cuisine: 'Both',
    category: 'Vegetarian',
    isVegetarian: true,
    shortDescription: 'Ghar ke dastarkhwan ki sab se aasan, lazeez aur fauri banne wali desi recipe jo roti aur paratha ke sath kamal lagti hai.',
    prepTime: '10 Min',
    cookTime: '15 Min',
    difficulty: 'Aasan',
    servings: '2-3 Log',
    badge: '🥬 Desi Vegetarian Comfort',
    isPopular: false,
    imageUrl: APP_IMAGES.alooJeera,
    ingredientsRequired: [
      'Aloo: 4 adad darmiyanay katay hue',
      'Sabut Safaid Zeera: 1 bara chamach',
      'Hari Mirchein: 3 adad katri hui',
      'Kutti Lal Mirch: 1 chhota chamach',
      'Haldi Powder: aadha chhota chamach',
      'Lehsan Paste: 1 chhota chamach',
      'Cooking Oil ya Sarson Ka Tail: 3 bare chamach',
      'Taaza Sabz Dhania & Leemo Ka Ras: Garnish ke liye'
    ],
    detectedIngredientsUsed: [
      'Aloo (Potatoes)',
      'Hari Mirchein (Green Chilies)',
      'Lehsan (Garlic)',
      'Taaza Dhania (Cilantro)',
      'Zeera / Whole Spices'
    ],
    missingIngredients: ['Cooking Oil', 'Namak', 'Haldi'],
    instructions: [
      {
        stepNumber: 1,
        title: 'Zeeray Ka Kadakta Tarka',
        description: 'Pan mein tail garam karke sabut zeera daalein. Jab zeera kadaknay lage aur khushbu aane lage to lehsan paste daal dein.'
      },
      {
        stepNumber: 2,
        title: 'Aloo aur Masalay Mix Karein',
        description: 'Katay hue aloo, haldi, kutti mirch aur namak shamil karein aur 2 minute tez aanch par chalayein.'
      },
      {
        stepNumber: 3,
        title: 'Dheemi Aanch Par Dum',
        description: '2 chamach pani ka chheenta dekar dhakkan band karein aur dheemi aanch par 8-10 minute galne dein.'
      },
      {
        stepNumber: 4,
        title: 'Leemo aur Dhania Ka Chatkhara',
        description: 'Aloo gal jayein to leemo ka ras nichor kar taaza dhania se saja kar garam garma parathe ke sath serve karein.'
      }
    ],
    chefTips: '“Sarson ke tail mein banayein to is aloo bhujia ka zaiqa purane Lahore aur Dehli ke dhaba jaisa lajawab ho jata hai.”',
    substitutions: [
      {
        missingItem: 'Agar Leemo Na Ho',
        substitute: 'Aadhe chamach Amchoor powder ya Chaat Masala'
      }
    ]
  }
];

export const INITIAL_ANALYSIS: AnalysisResponse = {
  isFood: true,
  detectedObject: 'Sabziyan aur Sabut Masalay Table',
  detectedIngredients: [
    { nameUrdu: 'Tamatar (Tomatoes)', nameEnglish: 'Fresh Vine Tomatoes', emoji: '🍅', confidence: 0.98, fitPercentage: 98, category: 'Sabzi' },
    { nameUrdu: 'Piyaz (Onions)', nameEnglish: 'Yellow & White Onions', emoji: '🧅', confidence: 0.96, fitPercentage: 96, category: 'Sabzi' },
    { nameUrdu: 'Lehsan & Adrak', nameEnglish: 'Garlic Bulbs & Fresh Ginger', emoji: '🧄', confidence: 0.94, fitPercentage: 94, category: 'Aromatics' },
    { nameUrdu: 'Hari Mirchein', nameEnglish: 'Green Chilies', emoji: '🌶️', confidence: 0.92, fitPercentage: 92, category: 'Mirch' },
    { nameUrdu: 'Aloo (Potatoes)', nameEnglish: 'Fresh Potatoes', emoji: '🥔', confidence: 0.90, fitPercentage: 90, category: 'Sabzi' },
    { nameUrdu: 'Taaza Dhania', nameEnglish: 'Cilantro Leaves', emoji: '🌿', confidence: 0.89, fitPercentage: 89, category: 'Herbs' },
    { nameUrdu: 'Sabut Desi Masalay', nameEnglish: 'Zeera, Sabut Dhaniya, Kali Mirch', emoji: '🧂', confidence: 0.95, fitPercentage: 95, category: 'Spices' }
  ],
  chefSummaryAdvice: '“Mashallah! Aapke paas desi khaney ki bunyadi cheezein maujood hain. In taaza tamatar aur masalon se behtareen Pakistani Chicken Karahi ya phir Shahi Paneer Butter Masala tayyar ho sakta hai. Neeche di gayi recipes dekhein!”',
  recipes: DEFAULT_RECIPES
};

export const COMMON_PANTRY_ITEMS = [
  'Murgh Gosht (Chicken)',
  'Bakra Gosht (Mutton)',
  'Paneer Cubes',
  'Daal Mash',
  'Basmati Chawal (Rice)',
  'Dahi (Yogurt)',
  'Makhan / Butter',
  'Kasturi Methi',
  'Sabut Kali Mirch',
  'Safaid Zeera'
];
