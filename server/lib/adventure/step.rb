module Adventure
  class Step < ActiveRecord::Base
    belongs_to :story
  end
end
