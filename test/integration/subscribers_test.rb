require 'test_helper'

class SubscribersTest < ActionDispatch::IntegrationTest
  def setup
    @user = User.create(email: "test@lol.com",
      password: "foobar",
      password_confirmation: "foobar"
    )
    @list = @user.lists.create(name: "test")
    @jwt = Auth.issue({user: @user.id})
  end

  test "unauthenticated create" do
    assert_no_difference 'Subscriber.count' do
      post user_list_subscribers_path(user_id: @user.id, list_id: @list.id), params: {
        subscriber: {
          email: "lol@lol.com",
        }
      }
    end
    assert_equal "unauthorized", response.parsed_body["error"]
  end

  test "authenticated create" do
    assert_difference 'Subscriber.count', 1 do
      post user_list_subscribers_path(user_id: @user.id, list_id: @list.id), params: {
        subscriber: {
          email: "lol@lol.com",
        }
      }, headers: {
        authorization: "Bearer #{@jwt}"
      }
    end
    assert_response :success
  end

  test "show subscribers" do
    get user_list_subscribers_path(user_id: @user.id, list_id: @list.id)
    assert_response :success
  end
end

