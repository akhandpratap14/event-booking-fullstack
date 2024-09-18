class CreateEvents < ActiveRecord::Migration[7.1]
  def change
    create_table :events do |t|
      t.string :title
      t.string :description
      t.string :location
      t.integer :number_of_uses
      t.date :date
      t.time :time
      t.references :host, null: false, foreign_key: { to_table: :users }

      t.timestamps
    end
  end
end
