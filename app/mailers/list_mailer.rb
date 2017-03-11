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

  def confirm_subscriber(subscriber)
    @subscriber = subscriber
    @list = List.find(subscriber.list_id)
    @user = User.find(@list.user_id)
    @list_graph_id = Schema::id_from_object(@list, List, nil)
    mail(
      to: @subscriber.email,
      subject: "Confirm subscription to #{@list.name}",
      from: @user.email
    )
  end
end
