const React = require("react");

const Image = ({ src, alt, ...props }) => {
  return React.createElement("img", { src, alt, ...props });
};

module.exports = Image;
