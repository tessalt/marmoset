require 'test_helper'

class SubscriberTest < ActiveSupport::TestCase
  def setup
    @user = User.create(email: "test@lol.com",
      password: "foobar",
      password_confirmation: "foobar"
    )
    @list = @user.lists.create(name: "lol")
    @subscriber = @list.subscribers.build(email: "test@lol.com")
  end

  test "valid create" do
    assert @subscriber.valid?
  end

  test "should have valid email" do
    @subscriber.email = "test.lol"
    assert_not @subscriber.valid?
  end
end
