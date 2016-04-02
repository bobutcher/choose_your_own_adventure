require_relative "test_helper"

class AppTest < Minitest::Test
  include Rack::Test::Methods

  def app
    Sinatra::Application
  end

  def test_login_generates_token
    response = post "/login"
    assert response.ok?
    assert_equal String, SecureRandom.hex.class
  end

  def test_title_can_be_created
    header "CONTENT_TYPE",  "application/json"
    test_hash = { :title => "Knights of the round table" }
    response = post "/stories", test_hash.to_json

    assert_equal "Knights of the round table", test_hash[:title]
  end

  def test_can_call_single_story
    header "CONTENT_TYPE", "application/json"
    response = get "/stories/1"

  end

  def test_returns_404_error
    skip
  end

#   def test_story_class_exists
#     assert Story
#   end
#
#   def test_can_create_new_story
#     Story.new
#   end
#
#   def test_can_delete_story
#
#   end
#
end
