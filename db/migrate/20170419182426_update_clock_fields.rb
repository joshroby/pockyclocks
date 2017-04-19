class UpdateClockFields < ActiveRecord::Migration[5.0]
  def change
    add_column :clocks, :background_color, :string
    add_column :clocks, :header_background_color, :string
    add_column :clocks, :header_color, :string
    add_column :clocks, :text_color, :string
    rename_column :clocks, :fillColor, :fill_color
    rename_column :clocks, :emptyColor, :empty_color
  end
end
