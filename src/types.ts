export interface DetectedIngredient {
  nameUrdu: string;
  nameEnglish: string;
  emoji: string;
  confidence: number;
  fitPercentage: number;
  category: string;
}

export interface RecipeInstructionStep {
  stepNumber: number;
  title: string;
  description: string;
}

export interface IngredientSubstitution {
  missingItem: string;
  substitute: string;
}

export interface Recipe {
  id: string;
  name: string;
  nativeName?: string;
  cuisine: 'Pakistani' | 'Indian' | 'Both';
  category: string;
  isVegetarian: boolean;
  shortDescription: string;
  prepTime: string;
  cookTime: string;
  difficulty: 'Aasan' | 'Darmiyani' | 'Mushkil';
  servings: string;
  ingredientsRequired: string[];
  detectedIngredientsUsed: string[];
  missingIngredients?: string[];
  instructions: RecipeInstructionStep[];
  chefTips: string;
  substitutions: IngredientSubstitution[];
  imageUrl: string;
  badge?: string;
  isPopular?: boolean;
}

export interface AnalysisResponse {
  isFood: boolean;
  detectedObject?: string;
  rejectionMessage?: string;
  detectedIngredients: DetectedIngredient[];
  chefSummaryAdvice?: string;
  recipes: Recipe[];
}

export interface ChefChatMessage {
  id: string;
  sender: 'user' | 'chef';
  text: string;
  timestamp: string;
}
