import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCurrentTimeZone,
} from '../../store/slice';

import timezones from '../../timezones.json';
import './Header.scss';

export const Header = () => {
  const dispatch = useDispatch();
  const { currentTimeZone } = useSelector(state => state.events);

  return (
    <header className="header">
      <div className="header__content">
        <h1 className="header__title">Event Manager</h1>
        <div className="header__timezones timezones">
          <div className="timezones__title">
            <div className="timezones__logo">
              <img
                src="images/timezones-logo.png"
                alt="timezones-logo"
              />
            </div>
            <span>Select Timezone</span>
          </div>
          <div className="timezones__list">
            <button type="button" className="timezones__arrow" />

            <select
              className="timezones__select"
              value={currentTimeZone}
              onChange={event => dispatch(
                setCurrentTimeZone(event.target.value),
              )}
            >
              {timezones.timezones.map(zone => (
                <option value={zone.value}>
                  {zone.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </header>
  );
};
