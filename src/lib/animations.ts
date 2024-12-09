// Cubic bezier timing function for natural easing
export const EASINGS = {
  easeInOutCubic: "cubic-bezier(0.645, 0.045, 0.355, 1.000)",
  easeOutBack: "cubic-bezier(0.34, 1.56, 0.64, 1)",
};

export const DURATIONS = {
  normal: 300,
  content: 700, // Increased from 400 to 700 for slower expansion/retraction
};

export const DELAYS = {
  content: 100, // Increased from 75 to 100 for smoother transition
};