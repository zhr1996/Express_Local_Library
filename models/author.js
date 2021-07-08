var mongoose = require("mongoose");
const { DateTime } = require("luxon");
var Schema = mongoose.Schema;

var AuthorSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  family_name: { type: String, required: true, maxLength: 100 },
  date_of_birth: { type: Date },
  date_of_death: { type: Date },
});

// Virtual for author's full name
AuthorSchema.virtual("name").get(function () {
  return this.family_name + ", " + this.first_name;
});

// // Virtual for author's lifespan
// AuthorSchema.virtual("lifespan").get(function () {
//   return (
//     this.date_of_death.getYear() - this.date_of_birth.getYear()
//   ).toString();
// });

// Virtual for author's URL
AuthorSchema.virtual("url").get(function () {
  return "/catalog/author/" + this._id;
});

// Virtual for life span
AuthorSchema.virtual("lifespan").get(function () {
  let final_string = "";
  // if (this.data_of_birth === null && this.date_of_death === null) {
  //   return "";
  // }
  console.log(this.data_of_birth);
  if (this.date_of_birth !== undefined) {
    final_string += DateTime.fromJSDate(this.date_of_birth).toLocaleString(
      DateTime.DATE_MED
    );
  }
  console.log(final_string);
  final_string += " - ";
  if (this.date_of_death !== undefined) {
    final_string += DateTime.fromJSDate(this.date_of_death).toLocaleString(
      DateTime.DATE_MED
    );
  }
  console.log(final_string);
  return final_string;
});
//Export model
module.exports = mongoose.model("Author", AuthorSchema);
