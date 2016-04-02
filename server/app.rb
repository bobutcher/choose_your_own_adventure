ENV["RACK_ENV"] ||= 'development'

require "rubygems"
require "bundler/setup"
require "sinatra"
require "json"

require_relative "lib/adventure"

set :static, true
set :public_folder, Proc.new { File.join(root, "..", "client") }

before do
  content_type "application/json"
end

post "/login" do
  token = SecureRandom.hex
end

post "/stories" do
  body = request.body.read
  payload = JSON.parse(body)
  story = Story.create!(payload)
  story.to_json
end

get "/stories/:id" do
  params[:id]

end



# get "/stories/storylist" do
#
# end
#
# delete "stories/delete" do
#
# end
#
# patch "stories/update" do
#
# end
