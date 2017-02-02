require 'test_helper'

class ListTest < ActiveSupport::TestCase
  def setup
    @user = User.create(email: "test@lol.com",
      password: "foobar",
      password_confirmation: "foobar"
    )
    @list = @user.lists.build(name: "lol")
  end

  test "should be valid" do
    assert @list.valid?
  end

  test "should have name" do
    @list.name = ""
    assert_not @list.valid?
  end

  test "name should not be really long" do
    @list.name = "a" * 120
    assert_not @list.valid?
  end
end
