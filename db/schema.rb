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

ActiveRecord::Schema.define(version: 20170328123631) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "letters", force: :cascade do |t|
    t.string   "subject"
    t.text     "contents"
    t.boolean  "sent",       default: false
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
    t.integer  "user_id"
    t.integer  "list_id"
    t.index ["user_id"], name: "index_letters_on_user_id", using: :btree
  end

  create_table "lists", force: :cascade do |t|
    t.string   "name"
    t.integer  "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_lists_on_user_id", using: :btree
  end

  create_table "subscribers", force: :cascade do |t|
    t.string   "email"
    t.integer  "list_id"
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
    t.boolean  "confirmed",  default: false
    t.index ["list_id"], name: "index_subscribers_on_list_id", using: :btree
  end

  create_table "users", force: :cascade do |t|
    t.string   "name"
    t.string   "email"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.string   "password_digest"
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
  end

  add_foreign_key "letters", "users"
  add_foreign_key "lists", "users"
  add_foreign_key "subscribers", "lists"
end
