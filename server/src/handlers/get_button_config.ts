
import { db } from '../db';
import { buttonConfigsTable } from '../db/schema';
import { type ButtonConfig } from '../schema';
import { desc } from 'drizzle-orm';

export const getButtonConfig = async (): Promise<ButtonConfig> => {
  try {
    // Get the most recently created button config
    const result = await db.select()
      .from(buttonConfigsTable)
      .orderBy(desc(buttonConfigsTable.created_at))
      .limit(1)
      .execute();

    if (result.length === 0) {
      throw new Error('No button configuration found');
    }

    return result[0];
  } catch (error) {
    console.error('Failed to get button config:', error);
    throw error;
  }
};
