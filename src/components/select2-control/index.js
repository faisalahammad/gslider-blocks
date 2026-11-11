import { __ } from '@wordpress/i18n';
import { useMemo } from '@wordpress/element';
import { BaseControl } from '@wordpress/components';
import Select from 'react-select';

/**
 * Select2Control — Reusable select component wrapping react-select
 * 
 * Maps raw value strings/arrays automatically to option objects for react-select.
 */
const Select2Control = ({
    label = '',
    options = [],
    value,
    onChange,
    isMulti = false,
    isClearable = false,
    placeholder = __('Select...', 'gslider-blocks'),
}) => {
    // Map raw string value / array of values to react-select option format
    const selectedOption = useMemo(() => {
        if (isMulti) {
            if (!Array.isArray(value)) return [];
            return value
                .map((val) => options.find((opt) => opt.value === val))
                .filter(Boolean);
        }
        return options.find((opt) => opt.value === value) || null;
    }, [options, value, isMulti]);

    const handleChange = (selected) => {
        if (isMulti) {
            const values = selected ? selected.map((opt) => opt.value) : [];
            onChange(values);
        } else {
            onChange(selected ? selected.value : '');
        }
    };

    // Style configuration matching the typography control exactly
    const select2Styles = {
        control: (base, state) => ({
            ...base,
            backgroundColor: '#fff',
            borderColor: state.isFocused ? '#007cba' : '#f0f0f0',
            borderWidth: '1px',
            boxShadow: state.isFocused ? '0 0 0 1px #007cba' : 'none',
            borderRadius: '4px',
            minHeight: '32px',
            height: isMulti ? 'auto' : '32px',
            '&:hover': {
                borderColor: state.isFocused ? '#007cba' : '#f0f0f0',
            },
        }),
        valueContainer: (base) => ({
            ...base,
            padding: isMulti ? '2px 8px' : '0 8px',
            minHeight: '32px',
            height: isMulti ? 'auto' : '32px',
            display: 'flex',
            alignItems: 'center',
            flexWrap: isMulti ? 'wrap' : 'nowrap',
            gap: '2px',
        }),
        indicatorsContainer: (base) => ({
            ...base,
            minHeight: '32px',
            height: isMulti ? 'auto' : '32px',
        }),
        dropdownIndicator: (base) => ({
            ...base,
            color: '#1e1e1e',
            transition: 'all 0.2s ease',
            '&:hover': {
                color: '#007cba',
            },
            svg: {
                width: 16,
                height: 16,
                fill: 'currentColor',
            },
        }),
        input: (base) => ({
            ...base,
            color: '#1e1e1e',
            fontSize: '12px',
            padding: 0,
            margin: 0,
            height: '32px',
            lineHeight: 'normal',
            outline: 'none',
            boxShadow: 'none',
            '&:focus': {
                outline: 'none',
                boxShadow: 'none',
            },
        }),
        singleValue: (base) => ({
            ...base,
            color: '#1e1e1e',
            lineHeight: 'normal',
        }),
        menu: (base) => ({
            ...base,
            backgroundColor: '#fff',
            border: '1px solid #f0f0f0',
            borderRadius: '4px',
            boxShadow: 'none',
            marginTop: '2px',
            zIndex: 999,
        }),
        menuList: (base) => ({
            ...base,
            paddingTop: 0,
            paddingBottom: 0,
            borderRadius: '4px',
            border: 'none',
            maxHeight: '200px',
            overflowY: 'auto',
            scrollbarWidth: 'thin',
        }),
        option: (base, state) => ({
            ...base,
            backgroundColor:
                state.isSelected || state.isFocused ? '#f0f0f0' : '#fff',
            color: state.isFocused ? '#006ba1' : '#1e1e1e',
            fontSize: '12px',
            fontWeight: 400,
            lineHeight: 1.3,
            padding: '6px 12px',
            cursor: 'pointer',
            outline: 'none',
        }),
        placeholder: (base) => ({
            ...base,
            color: '#1e1e1e',
            fontSize: '12px',
        }),
    };

    return (
        <BaseControl
            className="gslider-select2-control-wrapper"
            label={ label }
        >
            <Select
                options={options}
                value={selectedOption}
                onChange={handleChange}
                isMulti={isMulti}
                isClearable={isClearable}
                placeholder={placeholder}
                className="gslider-select2-control"
                classNamePrefix="react-select"
                styles={select2Styles}
            />
        </BaseControl>
    );
};

export default Select2Control;
