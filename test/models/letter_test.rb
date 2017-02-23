require 'test_helper'

class LetterTest < ActiveSupport::TestCase
  def setup
    @user = User.create(email: "test@lol.com",
      password: "foobar",
      password_confirmation: "foobar"
    )
    @list = @user.lists.create(name: "lol")
    @letter = @list.letters.build(subject: "lols", contents: "enjoy the latest lols")
  end

  test "valid create" do
    assert @letter.valid?
  end

  test "has list id" do
    assert @letter.list_id == @list.id
  end
end
