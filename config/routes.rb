Rails.application.routes.draw do
  get 'room/:name', controller: "room", action: "show"

  put 'room/:name', controller: "room", action: "update"

  get 'clocks/index'

  root 'clocks#index'
end
