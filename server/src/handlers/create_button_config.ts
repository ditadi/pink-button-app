
import { db } from '../db';
import { buttonConfigsTable } from '../db/schema';
import { type CreateButtonConfigInput, type ButtonConfig } from '../schema';

export const createButtonConfig = async (input: CreateButtonConfigInput): Promise<ButtonConfig> => {
  try {
    // Insert button config record
    const result = await db.insert(buttonConfigsTable)
      .values({
        text: input.text,
        color: input.color,
        action: input.action
      })
      .returning()
      .execute();

    return result[0];
  } catch (error) {
    console.error('Button config creation failed:', error);
    throw error;
  }
};
