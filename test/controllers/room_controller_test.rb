require 'test_helper'

class RoomControllerTest < ActionDispatch::IntegrationTest
  test "should get show" do
    get url_for(:controller => :room, :action => :show, :name => "one")

    assert_response :success
    assert_equal "Clock One", JSON.parse(response.body).dig("clocks", 0, "name")
  end

  test "should get create" do
    put url_for(:controller => :room, :action => :show, :name => "three"), params: {
      clocks: [
        {
          name: "clock three",
          position: {x:1, y:3},
          colors: {
            fill: "black", empty:"white", background: "teal", header:
            "orange", headerBackground: "puce", text: "chucknorris"},
            currentSegment: 3,
            labels: [
              "Good", "Okay", "Less okay", "Quite bad now", "What is
                       happening?", "Can we not?", "NOPE."
            ]
        }
      ]
    }
    assert_response :success

    clock = Clock.where(name: "clock three").first
    assert_not_nil clock
    assert_equal "chucknorris", clock.text_color
  end
end
