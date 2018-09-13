# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# 1 admin 5 users, each with 10 microposts, 2 following
require 'factory_girl_rails'
require 'byebug'

def create (*args)
  FactoryGirl.create(*args)
end

def create_list (*args)
  FactoryGirl.create_list(*args)
end

create(:admin, email: 'admin@test.test', password: 'abc123', password_confirmation: 'abc123')

users = create_list(:user, 10)

users.each do |user|
  posts = create_list(:micropost, 10, user: user)
  4.times {
    Relationship.find_or_create_by!(
      follower: user,
      followed: users.select {|u| u != user }.sample
    )
  }
end

