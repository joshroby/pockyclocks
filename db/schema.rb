# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170419182426) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "clocks", force: :cascade do |t|
    t.integer  "room_id"
    t.string   "name"
    t.integer  "posx"
    t.integer  "posy"
    t.integer  "segment"
    t.string   "priority"
    t.string   "fill_color"
    t.string   "empty_color"
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
    t.string   "background_color"
    t.string   "header_background_color"
    t.string   "header_color"
    t.string   "text_color"
    t.index ["room_id"], name: "index_clocks_on_room_id", using: :btree
  end

  create_table "rooms", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "segments", force: :cascade do |t|
    t.integer  "clock_id"
    t.string   "pos"
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["clock_id"], name: "index_segments_on_clock_id", using: :btree
    t.index ["pos"], name: "index_segments_on_pos", using: :btree
  end

  add_foreign_key "clocks", "rooms"
  add_foreign_key "segments", "clocks"
end
