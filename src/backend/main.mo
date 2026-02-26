import Map "mo:core/Map";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Int "mo:core/Int";
import Time "mo:core/Time";
import Text "mo:core/Text";

actor {
  type Submission = {
    name : Text;
    phone : Text;
    bookRequirement : Text;
    timestamp : Time.Time;
  };

  module Submission {
    public func compare(sub1 : Submission, sub2 : Submission) : Order.Order {
      Int.compare(sub1.timestamp, sub2.timestamp);
    };
  };

  let submissions = Map.empty<Text, Submission>();
  var nextId = 0;

  public shared ({ caller }) func submitForm(name : Text, phone : Text, bookRequirement : Text) : async () {
    let submission : Submission = {
      name;
      phone;
      bookRequirement;
      timestamp = Time.now();
    };

    let id = nextId.toText();
    submissions.add(id, submission);
    nextId += 1;
  };

  public query ({ caller }) func getAllSubmissions() : async [Submission] {
    submissions.values().toArray().sort();
  };
};
