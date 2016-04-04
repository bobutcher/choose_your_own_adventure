class StepMigration < ActiveRecord::Migration

  def up
    drop_table :steps if table_exists?(:steps)
    create_table :steps do |t|
      t.timestamps null: true
      t.boolean :start
      t.string :option_one_text
      t.integer :option_one_id
      t.string :option_two_text
      t.integer :option_two_id
      t.boolean :last_step
    end
  end

  def down
    drop_table :steps if table_exists?(:steps)
  end
end
