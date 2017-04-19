Rails.application.routes.draw do
  get 'clocks/index'

  root 'clocks#index'
end
