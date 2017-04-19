class Clock < ApplicationRecord
  belongs_to :room
  has_many :segments, :dependent => :destroy
end
