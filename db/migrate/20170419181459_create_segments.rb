class CreateSegments < ActiveRecord::Migration[5.0]
  def change
    create_table :segments do |t|
      t.references :clock, foreign_key: true
      t.string :pos
      t.string :name

      t.timestamps
    end
    add_index :segments, :pos
  end
end
