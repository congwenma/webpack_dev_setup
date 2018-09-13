FactoryGirl.define do
  factory :user do
    sequence(:name)  { Faker::Name.name }
    sequence(:email) { |n| "#{n}#{Faker::Internet.email}" }
    password "foobar"
    password_confirmation "foobar"

    factory :admin do
      admin true
      name { "admin_#{Faker::Name.name.split(' ').second.downcase}" }
    end
  end

  factory :micropost do
    content { Faker::Lorem.paragraph.first(140) }
    user
  end
end
