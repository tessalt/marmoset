require 'test_helper'

class ListsTest < ActionDispatch::IntegrationTest
  def setup
    @user = User.create(email: "test@lol.com",
      password: "foobar",
      password_confirmation: "foobar"
    )
    @list = @user.lists.create(name: "test")
    @jwt = Auth.issue({user: @user.id})
  end

  test "unauthenticated create" do
    assert_no_difference 'List.count' do
      post lists_path, params: {
        list: {
          name: "lol",
        }
      }
    end
    assert_equal "unauthorized", response.parsed_body["error"]
  end

  test "authenticated create" do
    assert_difference 'List.count', 1 do
      post lists_path(user_id: @user.id), params: {
        list: {
          name: "lol",
        }
      }, headers: {
        authorization: "Bearer #{@jwt}"
      }
    end
    assert_response :success
  end

  test "show lists" do
    get list_path(id: @list.id), nil, {
        authorization: "Bearer #{@jwt}"
    }
    assert_response :success
  end
end

