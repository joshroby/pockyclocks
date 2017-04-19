class RoomController < ApplicationController
  def show
    render json: json_for(params[:name])
  end

  def update
    Room.transaction do
      old = Room.where(:name => params[:name]).first
      if old != nil
        old.destroy
      end

      room = Room.new(:name => params[:name])
      room.save!
      params.fetch(:clocks).each do |clock_hash|
        clock = Clock.new(clock_fields(clock_hash))
        room.clocks << clock

        clock_hash.fetch(:labels).each_with_index do |name, idx|
          clock.segments.create(:name => name, :pos => idx)
        end
      end
    end

    render json: json_for(params[:name])
  end

  private

  def json_for(name)
    room = Room.where(:name => name).includes(clocks: [:segments]).first!

    return {
      name: room.name,
      clocks: room.clocks.map do |clock|
        {
          name: name,
          position: {
            x: clock.posx,
            y: clock.posy
          },
          colors: {
            fill: clock.fill_color,
            empty: clock.empty_color,
            background: clock.background_color,
            headerBackground: clock.header_background_color,
            header: clock.header_color,
            text: clock.text_color
          },
          labels: clock.segments.sort_by(&:pos).map(&:name)
        }
      end
    }
  end

  def room_params
    params.require(:name)
  end

  def clock_fields(hash)
    colors = hash.fetch(:colors)
    position = hash.fetch(:position)
    {
      :name                    => hash.fetch("name"),
      :segment                 => hash.fetch("currentSegment"),
      #:priority                => hash.fetch("priority"),
      :priority                => "active",
      :posx                    => position.fetch("x"),
      :posy                    => position.fetch("y"),
      :fill_color              => colors.fetch("fill"),
      :empty_color             => colors.fetch("empty"),
      :background_color        => colors.fetch("background"),
      :header_background_color => colors.fetch("headerBackground"),
      :header_color            => colors.fetch("header"),
      :text_color              => colors.fetch("text"),
    }
  end
end
