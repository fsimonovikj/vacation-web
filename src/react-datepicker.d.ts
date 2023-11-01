declare module 'react-datepicker' {
    import React from 'react';
  
    interface DatePickerProps {
      selected: Date | null;
      onChange: (date: Date | null) => void;
      startDate?: Date | null;
      endDate?: Date | null;
      selectsRange?: boolean;
      inline?: boolean;
      // Add any other props you're using in your component
    }
  
    const DatePicker: React.ComponentType<DatePickerProps>;
  
    export default DatePicker;
  }