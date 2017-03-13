class ListMailer < ApplicationMailer
  def letter(letter)
    @letter = letter
    @list = List.find(letter.list_id)
    @user = User.find(@list.user_id)
    @list_graph_id = Schema::id_from_object(@list, List, nil)
    recipients = @list.subscribers.where(confirmed: true)
    email = mail(
      to: recipients.pluck(:email),
      subject: @letter.subject,
      from: @user.email
    )
    email.mailgun_recipient_variables = recipients.inject({}) do |memo, recipient|
      memo[recipient[:email]] = {
        id: recipient_graph_id(recipient)
      }
      memo
    end
  end

  def confirm_subscriber(subscriber)
    @subscriber = subscriber
    @list = List.find(subscriber.list_id)
    @user = User.find(@list.user_id)
    @list_graph_id = Schema::id_from_object(@list, List, nil)
    @subscriber_graph_id = Schema::id_from_object(@subscriber, Subscriber, nil)
    mail(
      to: @subscriber.email,
      subject: "Confirm subscription to #{@list.name}",
      from: @user.email
    )
  end

  def recipient_graph_id(subscriber)
    Schema::id_from_object(subscriber, Subscriber, nil)
  end
end
