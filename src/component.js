import React, { useState } from 'react';
import styled from 'styled-components';


// Стилизация компонентов
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1em;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  font-size: 1.2em;
`;

const Select = styled.select`
  margin-top: 0.5em;
`;

const Input = styled.input`
  margin-top: 0.5em;
`;

const Textarea = styled.textarea`
  margin-top: 0.5em;
`;

const Button = styled.button`
  margin-top: 1em;
  padding: 0.5em 1em;
  font-size: 1.2em;
  color: white;
  background-color: #007BFF;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const BookingList = styled.ul`
  margin-top: 2em;
  list-style-type: none;
`;

const BookingItem = styled.li`
  margin-bottom: 1em;
  padding: 1em;
  border: 1px solid #007BFF;
  border-radius: 5px;
`;

// Предположим, что у нас есть некоторые данные о помещениях и мероприятиях


const rooms = ['Room 1', 'Room 2', 'Room 3'];
let initialEvents = [];

const NewEventeee = ({ onEventCreate }) => {
  const [newEvent, setNewEvent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onEventCreate(newEvent);
    setNewEvent('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Название нового мероприятия:
        <input type="text" value={newEvent} onChange={(e) => setNewEvent(e.target.value)} required />
      </label>
      <button type="submit">Создать мероприятие</button>
    </form>
  );
};


const isTimeOverlap = (newBooking, bookings) => {
    const newStart = new Date(newBooking.startDate).getTime();
    const newEnd = new Date(newBooking.endDate).getTime();
  
    for (let booking of bookings) {
      const start = new Date(booking.startDate).getTime();
      const end = new Date(booking.endDate).getTime();
  
      if ((newStart >= start && newStart <= end) || (newEnd >= start && newEnd <= end)) {
        return true;
      }
    }
  
    return false;
};


const BookingApp = () => {
  const [booking, setBooking] = useState({
    event: '',
    startDate: '',
    endDate: '',
    room: '',
    comment: '',
    partial: false,
  });
  const [bookings, setBookings] = useState([]);
  const [events, setEvents] = useState(initialEvents); // Добавляем состояние events

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setBooking({
      ...booking,
      [e.target.name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (isTimeOverlap(booking, bookings)) {
      alert('Мероприятие на это время уже забронировано');
    } else {
      setBookings([...bookings, booking]);
      setBooking({
        event: '',
        startDate: '',
        endDate: '',
        room: '',
        comment: '',
        partial: false,
      });
    }
  };

  const handleEventCreate = (newEvent) => {
    initialEvents = [...events, newEvent];
    
  };

  return (
    <div>
    <NewEventeee onEventCreate={handleEventCreate} />
      <Form onSubmit={handleSubmit}>
        <Label>
          Мероприятие:
          <Select name="event" value={booking.event} onChange={handleChange} required>
            {events.map((event, index) => (
              <option key={index} value={event}>
                {event}
              </option>
            ))}
          </Select>
        </Label>
        <Label>
          Дата и время начала:
          <Input type="datetime-local" name="startDate" value={booking.startDate} onChange={handleChange} required />
        </Label>
        <Label>
          Дата и время окончания:
          <Input type="datetime-local" name="endDate" value={booking.endDate} onChange={handleChange} required />
        </Label>
        <Label>
          Помещение:
          <Select name="room" value={booking.room} onChange={handleChange} required>
            {rooms.map((room, index) => (
              <option key={index} value={room}>
                {room}
              </option>
            ))}
          </Select>
        </Label>
        <Label>
          Комментарий:
          <Textarea name="comment" value={booking.comment} onChange={handleChange} required />
        </Label>
        <p>Забронировать частично?</p>
        <input type='checkbox'></input>
        <Button type="submit">Забронировать</Button>
      </Form>
      <BookingList>
        {bookings.map((booking, index) => (
          <BookingItem key={index}>
            <p>Мероприятие: {booking.event}</p>
            <p>Дата и время начала: {booking.startDate}</p>
            <p>Дата и время окончания: {booking.endDate}</p>
            <p>Помещение: {booking.room}</p>
            <p>Комментарий: {booking.comment}</p>
            
          </BookingItem>
        ))}
      </BookingList>
    </div>
  );
};

export default BookingApp;
