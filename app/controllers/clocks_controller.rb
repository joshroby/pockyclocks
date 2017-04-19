class ClocksController < ApplicationController
  include ActionController::MimeResponds
  def index
    respond_to do |format|
      format.html { render html: File.read(Rails.root + "public/index.html".to_s).html_safe}
    end
  end
end
