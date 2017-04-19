require 'test_helper'

class RoomControllerTest < ActionDispatch::IntegrationTest
  test "should get show" do
    get url_for(:controller => :room, :action => :show, :name => "one")
    assert_response :success
  end

  test "should get create" do
    put url_for(:controller => :room, :action => :show, :name => "three"), params: {
      clocks: [
        {
          name: "three",
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
  end

end
