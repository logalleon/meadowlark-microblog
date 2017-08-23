const React = require('react');

class DateSelector extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      date: props.date,
      initialDate: '',
      initialHours: '',
      initialHoursSelector: '0'
    };
    this.setHours = this.setHours.bind(this);
  }

  componentWillMount () {
    this.calculateInitialTimeValues(this.state.date);
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.date.getTime() !== this.state.date.getTime()) {
      console.log('okay');
      this.calculateInitialTimeValues(nextProps.date);
    }
  }

  calculateInitialTimeValues (date) {
    let initialDate = this.getInitialDate(date);
    let initialHours = date.getHours();
    let initialHoursSelector = '0';
    if (initialHours >= 12) {
      initialHours -= 12;
      initialHoursSelector = '12';
    }
    let minutes = String(date.getMinutes());
    if (minutes.length < 2) {
      minutes = '0' + minutes;
    }
    initialHours += ':' + minutes;
    this.setState({ initialDate, initialHours, initialHoursSelector });
  }

  setHours (e) {
    e.preventDefault();
    let value = this.hoursInput.value;
    value = value.trim();
    if (!value.match(/[0-9]{1,2}:[0-9]{2}/)) {
      return;
    }
    let modifier = this.hoursSelector.value;
    let hours = Number(value.split(':')[0]);
    hours += Number(modifier);
    let minutes = Number(value.split(':')[1]);
    let nextDate = new Date(this.state.date);
    nextDate.setHours(hours, minutes);
    this.props.updateStateValue(this.props.name, nextDate);
    this.setState({ date: nextDate });
  }

  getInitialDate (date) {
    let initialDate = this.state.date.getFullYear() + '-';
    let months = String(Number(this.state.date.getMonth() + 1));
    if (months.length < 2) {
      months = '0' + months;
    }
    initialDate += months + '-';
    let days = String(this.state.date.getDate());
    if (days.length < 2) {
      days = '0' + days;
    }
    initialDate += days;
    return initialDate;
  }

  render () {
    return (
      <span className='DateSelector'>
        <input
          className='Input Input--Date'
          type='date'
          defaultValue={this.state.initialDate}
          onChange={(e) => {
            e.preventDefault();
            let nextDate = new Date(e.target.value);
            this.state.date = nextDate;
            this.props.updateStateValue(this.props.name, nextDate);
            this.hoursSelector.selectedIndex = 0;
            this.hoursInput.value = '';
          }}
        />
        <input className='Input Input--Text'
          type='text'
          placeholder='8:00'
          onBlur={this.setHours}
          defaultValue={this.state.initialHours}
          ref={(input) => { this.hoursInput = input; }}
        />
        <select
          className='Select Input Input--Select'
          ref={(select) => { this.hoursSelector = select; }}
          onChange={this.setHours}
          defaultValue={this.state.initialHoursSelector}
        >
          <option value='0'>AM</option>
          <option value='12'>PM</option>
        </select>
      </span>
    );
  }

}
module.exports = DateSelector;
