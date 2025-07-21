import { useState, useRef, useEffect, useCallback } from 'react';
import { useDebounce } from '../../hooks/useDebounce';
import { SelectLayout } from './SelectLayout';

export const Select = ({
  label,
  isLabelHidden,
  id,
  name,
  value,
  setValue,
  options
}) => {
  const comboboxRef = useRef(null);

  const getPreselectIndex = useCallback(
    (val, opts) => opts.findIndex((option) => option.value === val),
    []
  );

  const [preselect, setPreselect] = useState(getPreselectIndex(value, options));
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleListbox = useCallback((e) => {
    e?.preventDefault();
    setIsExpanded((prev) => !prev);
  }, []);
  const openListbox = useCallback(() => !isExpanded && setIsExpanded(true), [
    isExpanded
  ]);
  const closeListbox = useCallback(() => isExpanded && setIsExpanded(false), [
    isExpanded
  ]);

  const handlePreselect = useCallback(
    (index) => index !== preselect && setPreselect(index),
    [preselect]
  );

  const handleSelect = useCallback(
    (position) => {
      if (position < 0 || position >= options.length) return;
      handlePreselect(position);
      setValue(options[position].value);
    },
    [options, handlePreselect, setValue]
  );

  const handleOptionClick = useCallback(
    (position) => {
      handleSelect(position);
      closeListbox();
    },
    [handleSelect, closeListbox]
  );

  const handleClear = useCallback(() => {
    handleSelect(0);
  }, [handleSelect]);

  const dismiss = useCallback(
    ({ relatedTarget }) => {
      const rootEl = comboboxRef.current?.parentElement;
      if (!rootEl?.contains(relatedTarget)) {
        closeListbox();
        handlePreselect(getPreselectIndex(value, options));
      }
    },
    [closeListbox, handlePreselect, getPreselectIndex, value, options]
  );

  const input = useRef({ query: '', isQueryIncludesOnlyIdenticalChars: true });

  const updateInputAndSearch = useDebounce(
    (char) => {
      if (char.length === 1) {
        if (
          input.current.isQueryIncludesOnlyIdenticalChars &&
          input.current.query.length > 0
        ) {
          input.current.isQueryIncludesOnlyIdenticalChars =
            input.current.query[input.current.query.length - 1] === char;
        }
        input.current.query += char;
      }

      const queryText = (input.current.isQueryIncludesOnlyIdenticalChars
        ? input.current.query[0] || ''
        : input.current.query
      ).toLowerCase();

      if (queryText === '') return;

      const pool = options.reduce((acc, option, i) => {
        if (option.label.toLowerCase().startsWith(queryText)) acc.push(i);

        return acc;
      }, []);

      if (pool.length === 0) return;

      const currentPositionInPool = pool.indexOf(preselect);
      const nextSelect = pool[currentPositionInPool + 1] ?? pool[0];

      handleSelect(nextSelect);
    },
    100,
    { leading: true, maxWait: 400 }
  );

  const clearInput = useDebounce(() => {
    input.current.query = '';
    input.current.isQueryIncludesOnlyIdenticalChars = true;
  }, 400);

  const handleKeyDown = useCallback(
    (e) => {
      const isAlt = e.altKey;
      switch (e.code) {
        case 'Escape':
          dismiss(e);
          break;
        case 'Enter':
          openListbox();
          handleSelect(preselect);
          closeListbox();
          break;
        case 'Tab':
          handleSelect(preselect);
          closeListbox();
          break;
        case 'Space':
          e.preventDefault();
          openListbox();
          break;
        case 'End':
          handleSelect(options.length - 1);
          break;
        case 'PageDown':
          e.preventDefault();
          handleSelect(isExpanded ? options.length - 1 : preselect + 3);
          break;
        case 'ArrowDown':
          e.preventDefault();
          isAlt ? toggleListbox() : handleSelect(preselect + 1);
          break;
        case 'Home':
          handleSelect(1);
          break;
        case 'PageUp':
          e.preventDefault();
          handleSelect(isExpanded ? 1 : preselect - 3);
          break;
        case 'ArrowUp':
          e.preventDefault();
          isAlt ? toggleListbox() : handleSelect(preselect - 1);
          break;
        default:
          e.preventDefault();
          updateInputAndSearch(e.key);
          clearInput();
          break;
      }
    },
    [
      dismiss,
      openListbox,
      handleSelect,
      preselect,
      closeListbox,
      options.length,
      isExpanded,
      toggleListbox,
      updateInputAndSearch,
      clearInput
    ]
  );

  useEffect(() => {
    setPreselect(getPreselectIndex(value, options));
  }, [value, options, getPreselectIndex]);

  return (
    <SelectLayout
      comboboxRef={comboboxRef}
      label={label}
      isLabelHidden={isLabelHidden}
      id={id}
      name={name}
      value={value}
      options={options}
      preselect={preselect}
      isExpanded={isExpanded}
      onToggle={toggleListbox}
      onBlur={dismiss}
      onKeyDown={handleKeyDown}
      onMouseOver={handlePreselect}
      onClick={handleOptionClick}
      onClear={handleClear}
    >
      {options.find((option) => option.value === value)?.label}
    </SelectLayout>
  );
};
