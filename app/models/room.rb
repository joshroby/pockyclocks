class Room < ApplicationRecord
  has_many :clocks, :dependent => :destroy
end
