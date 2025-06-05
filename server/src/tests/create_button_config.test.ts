
import { afterEach, beforeEach, describe, expect, it } from 'bun:test';
import { resetDB, createDB } from '../helpers';
import { db } from '../db';
import { buttonConfigsTable } from '../db/schema';
import { type CreateButtonConfigInput } from '../schema';
import { createButtonConfig } from '../handlers/create_button_config';
import { eq } from 'drizzle-orm';

// Test input with action
const testInputWithAction: CreateButtonConfigInput = {
  text: 'Click Me',
  color: '#FF5733',
  action: 'submit_form'
};

// Test input without action (null)
const testInputWithoutAction: CreateButtonConfigInput = {
  text: 'Cancel',
  color: '#808080',
  action: null
};

describe('createButtonConfig', () => {
  beforeEach(createDB);
  afterEach(resetDB);

  it('should create a button config with action', async () => {
    const result = await createButtonConfig(testInputWithAction);

    // Basic field validation
    expect(result.text).toEqual('Click Me');
    expect(result.color).toEqual('#FF5733');
    expect(result.action).toEqual('submit_form');
    expect(result.id).toBeDefined();
    expect(result.created_at).toBeInstanceOf(Date);
  });

  it('should create a button config without action (null)', async () => {
    const result = await createButtonConfig(testInputWithoutAction);

    // Basic field validation
    expect(result.text).toEqual('Cancel');
    expect(result.color).toEqual('#808080');
    expect(result.action).toBeNull();
    expect(result.id).toBeDefined();
    expect(result.created_at).toBeInstanceOf(Date);
  });

  it('should save button config to database', async () => {
    const result = await createButtonConfig(testInputWithAction);

    // Query using proper drizzle syntax
    const buttonConfigs = await db.select()
      .from(buttonConfigsTable)
      .where(eq(buttonConfigsTable.id, result.id))
      .execute();

    expect(buttonConfigs).toHaveLength(1);
    expect(buttonConfigs[0].text).toEqual('Click Me');
    expect(buttonConfigs[0].color).toEqual('#FF5733');
    expect(buttonConfigs[0].action).toEqual('submit_form');
    expect(buttonConfigs[0].created_at).toBeInstanceOf(Date);
  });

  it('should save button config with null action to database', async () => {
    const result = await createButtonConfig(testInputWithoutAction);

    // Query using proper drizzle syntax
    const buttonConfigs = await db.select()
      .from(buttonConfigsTable)
      .where(eq(buttonConfigsTable.id, result.id))
      .execute();

    expect(buttonConfigs).toHaveLength(1);
    expect(buttonConfigs[0].text).toEqual('Cancel');
    expect(buttonConfigs[0].color).toEqual('#808080');
    expect(buttonConfigs[0].action).toBeNull();
    expect(buttonConfigs[0].created_at).toBeInstanceOf(Date);
  });
});
