
import { afterEach, beforeEach, describe, expect, it } from 'bun:test';
import { resetDB, createDB } from '../helpers';
import { db } from '../db';
import { buttonConfigsTable } from '../db/schema';
import { type CreateButtonConfigInput } from '../schema';
import { getButtonConfig } from '../handlers/get_button_config';

// Test data
const testConfig: CreateButtonConfigInput = {
  text: 'Click Me',
  color: '#FF0000',
  action: 'submit_form'
};

const testConfigWithoutAction: CreateButtonConfigInput = {
  text: 'Cancel',
  color: '#808080',
  action: null
};

describe('getButtonConfig', () => {
  beforeEach(createDB);
  afterEach(resetDB);

  it('should get the most recent button config', async () => {
    // Insert first config
    await db.insert(buttonConfigsTable)
      .values(testConfig)
      .execute();

    // Wait a moment to ensure different timestamps
    await new Promise(resolve => setTimeout(resolve, 10));

    // Insert second config
    await db.insert(buttonConfigsTable)
      .values(testConfigWithoutAction)
      .execute();

    const result = await getButtonConfig();

    // Should return the most recent config (second one)
    expect(result.text).toEqual('Cancel');
    expect(result.color).toEqual('#808080');
    expect(result.action).toBeNull();
    expect(result.id).toBeDefined();
    expect(result.created_at).toBeInstanceOf(Date);
  });

  it('should get button config with action', async () => {
    await db.insert(buttonConfigsTable)
      .values(testConfig)
      .execute();

    const result = await getButtonConfig();

    expect(result.text).toEqual('Click Me');
    expect(result.color).toEqual('#FF0000');
    expect(result.action).toEqual('submit_form');
    expect(result.id).toBeDefined();
    expect(result.created_at).toBeInstanceOf(Date);
  });

  it('should get button config with null action', async () => {
    await db.insert(buttonConfigsTable)
      .values(testConfigWithoutAction)
      .execute();

    const result = await getButtonConfig();

    expect(result.text).toEqual('Cancel');
    expect(result.color).toEqual('#808080');
    expect(result.action).toBeNull();
    expect(result.id).toBeDefined();
    expect(result.created_at).toBeInstanceOf(Date);
  });

  it('should throw error when no button config exists', async () => {
    await expect(getButtonConfig()).rejects.toThrow(/no button configuration found/i);
  });
});
