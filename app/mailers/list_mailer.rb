class ListMailer < ApplicationMailer
  def letter(letter)
    @letter = letter
    @list = List.find(letter.list_id)
    @user = User.find(@list.user_id)
    mail(
      to: @list.subscribers.pluck(:email),
      subject: @letter.subject,
      from: @user.email
    )
  end
end
