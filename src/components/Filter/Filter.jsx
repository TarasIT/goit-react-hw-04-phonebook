import PropTypes from 'prop-types';
import { FilterContainer, FilterInput, FilterLabel } from './Filter.styled';

export const Filter = ({ filter, inputHandler }) => {
  return (
    <FilterContainer>
      <FilterLabel>
        Find contact by name
        <FilterInput
          type="text"
          name="filter"
          value={filter}
          onChange={e => inputHandler(e.target.value)}
          required
        />
      </FilterLabel>
    </FilterContainer>
  );
};

Filter.propTypes = {
  inputHandler: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
};
