import React, { useState } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '../../Utils/Colors';

export default function CaptionWithReadMore({ caption, maxLength }) {
  const [showFullCaption, setShowFullCaption] = useState(false);

  // Check if caption is available
  if (!caption) {
    return null; // or return an empty component, or a placeholder
  }

  const toggleReadMore = () => {
    setShowFullCaption(!showFullCaption);
  };

  const displayedCaption = showFullCaption ? caption : `${caption.slice(0, maxLength)}...`;
  const readMoreText = showFullCaption ? 'Show Less' : 'Read more';

  return (
    <Text style={styles.captionContainer}>
      {displayedCaption}
      {caption.length > maxLength && (
        <TouchableOpacity onPress={toggleReadMore}>
          <Text style={styles.readMoreText}> {readMoreText}</Text>
        </TouchableOpacity>
      )}
    </Text>
  );
}

const styles = StyleSheet.create({
  captionContainer: {
    marginTop: 3,
  },
  readMoreText: {
    color: Colors.GRAY,
    marginTop: -3, // Adjust the marginTop to align "Read more" with the caption
    // Customize the color as needed
  },
});
