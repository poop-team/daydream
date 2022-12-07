import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  Modal,
  TouchableWithoutFeedback,
  TouchableOpacity,
  FlatList,
  UIManager
} from 'react-native';
import { ViewPropTypes, TextPropTypes } from 'deprecated-react-native-prop-types';
import PropTypes from 'prop-types';
import reject from 'lodash/reject';
import find from 'lodash/find';
import get from 'lodash/get';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const nodeTypes = PropTypes.oneOfType([
  PropTypes.element,
  PropTypes.object,
  PropTypes.bool,
  PropTypes.func
]);

const colorPack = {
  primary: '#312e81',
  primaryDark: '#215191',
  light: '#FFF',
  textPrimary: '#545151',
  placeholderTextColor: '#545151',
  iconColor: "#312e81",
  danger: '#C62828',
  borderColor: '#e9e9e9',
  backgroundColor: '#b1b1b1',
};

const styles = {
  footerWrapper: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  footerWrapperNC: {
    width: 320,
    flexDirection: 'column',
  },
  subSection: {
    backgroundColor: colorPack.light,
    borderBottomWidth: 1,
    borderColor: colorPack.borderColor,
    paddingLeft: 0,
    paddingRight: 20,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  greyButton: {
    height: 40,
    borderRadius: 5,
    elevation: 0,
    backgroundColor: colorPack.backgroundColor,
  },
  indicator: {
    fontSize: 30,
    color: colorPack.placeholderTextColor,
  },
  selectedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    paddingTop: 3,
    paddingRight: 3,
    paddingBottom: 3,
    margin: 3,
    borderRadius: 20,
    borderWidth: 2,
  },
  selectorView: (fixedHeight) => {
    const style = {
      flexDirection: 'column',
      marginBottom: 5,
      elevation: 2,
    };
    if (fixedHeight) {
      style.height = 250;
    }
    return style;
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
    backgroundColor: colorPack.light,
  },
  dropdownView: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    marginBottom: 10,
  },
};

// set UIManager LayoutAnimationEnabledExperimental
if (UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const defaultSearchIcon = (
  <Icon
    name="magnify"
    size={25}
    color={colorPack.placeholderTextColor}
    style={{ marginRight: 10 }}
  />
);

export default class MultiSelect extends Component {
  static propTypes = {
    single: PropTypes.bool,
    selectedItems: PropTypes.array,
    items: PropTypes.array.isRequired,
    uniqueKey: PropTypes.string,
    tagBorderColor: PropTypes.string,
    tagTextColor: PropTypes.string,
    tagContainerStyle: ViewPropTypes.style,
    fontFamily: PropTypes.string,
    tagRemoveIconColor: PropTypes.string,
    onSelectedItemsChange: PropTypes.func.isRequired,
    selectedItemFontFamily: PropTypes.string,
    selectedItemTextColor: PropTypes.string,
    itemFontFamily: PropTypes.string,
    itemTextColor: PropTypes.string,
    itemFontSize: PropTypes.number,
    selectedItemIconColor: PropTypes.string,
    searchIcon: nodeTypes,
    searchInputPlaceholderText: PropTypes.string,
    searchInputStyle: PropTypes.object,
    selectText: PropTypes.string,
    styleDropdownMenu: ViewPropTypes.style,
    styleDropdownMenuSubsection: ViewPropTypes.style,
    styleInputGroup: ViewPropTypes.style,
    styleItemsContainer: ViewPropTypes.style,
    styleListContainer: ViewPropTypes.style,
    styleMainWrapper: ViewPropTypes.style,
    styleRowList: ViewPropTypes.style,
    styleSelectorContainer: ViewPropTypes.style,
    styleTextDropdown: TextPropTypes.style,
    styleTextDropdownSelected: TextPropTypes.style,
    styleTextTag: TextPropTypes.style,
    styleIndicator: ViewPropTypes.style,
    altFontFamily: PropTypes.string,
    hideSubmitButton: PropTypes.bool,
    hideDropdown: PropTypes.bool,
    textColor: PropTypes.string,
    fontSize: PropTypes.number,
    fixedHeight: PropTypes.bool,
    hideTags: PropTypes.bool,
    canAddItems: PropTypes.bool,
    onAddItem: PropTypes.func,
    onChangeInput: PropTypes.func,
    displayKey: PropTypes.string,
    textInputProps: PropTypes.object,
    flatListProps: PropTypes.object,
    filterMethod: PropTypes.string,
    onClearSelector: PropTypes.func,
    onToggleList: PropTypes.func,
    removeSelected: PropTypes.bool,
    noItemsText: PropTypes.string,
    selectedText: PropTypes.string
  };

  static defaultProps = {
    single: false,
    selectedItems: [],
    uniqueKey: '_id',
    tagBorderColor: colorPack.primary,
    tagTextColor: colorPack.primary,
    fontFamily: '',
    tagRemoveIconColor: colorPack.danger,
    selectedItemFontFamily: '',
    selectedItemTextColor: colorPack.primary,
    searchIcon: defaultSearchIcon,
    itemFontFamily: '',
    itemTextColor: colorPack.textPrimary,
    itemFontSize: 16,
    selectedItemIconColor: colorPack.primary,
    searchInputPlaceholderText: 'Search',
    searchInputStyle: { color: colorPack.textPrimary, fontSize:50 },
    textColor: colorPack.textPrimary,
    selectText: 'Filters',
    altFontFamily: '',
    hideSubmitButton: false,
    fontSize: 14,
    fixedHeight: false,
    hideTags: false,
    hideDropdown: false,
    onChangeInput: () => { },
    displayKey: 'name',
    canAddItems: false,
    onAddItem: () => { },
    onClearSelector: () => { },
    onToggleList: () => { },
    removeSelected: false,
    noItemsText: 'No items to display.',
    selectedText: 'selected'
  };

  constructor(props) {
    super(props);
    this.state = {
      selector: false,
      searchTerm: ''
    };
  }

  getSelectedItemsExt = optionalSelctedItems => (
    <View
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap'
      }}
    >
      {this._displaySelectedItems(optionalSelctedItems)}
    </View>
  );

  _onChangeInput = value => {
    const { onChangeInput } = this.props;
    if (onChangeInput) {
      onChangeInput(value);
    }
    this.setState({ searchTerm: value });
  };

  _getSelectLabel = () => {
    const { selectText, single, selectedItems, displayKey, selectedText } = this.props;
    if (!selectedItems || selectedItems.length === 0) {
      return selectText;
    }
    if (single) {
      const item = selectedItems[0];
      const foundItem = this._findItem(item);
      return get(foundItem, displayKey) || selectText;
    }
    return `${selectText} (${selectedItems.length} ${selectedText})`;
  };

  _findItem = itemKey => {
    const { items, uniqueKey } = this.props;
    return find(items, singleItem => singleItem[uniqueKey] === itemKey) || {};
  };

  _displaySelectedItems = optionalSelectedItems => {
    const {
      fontFamily,
      tagContainerStyle,
      tagRemoveIconColor,
      tagBorderColor,
      uniqueKey,
      tagTextColor,
      selectedItems,
      displayKey,
      styleTextTag
    } = this.props;
    const actualSelectedItems = optionalSelectedItems || selectedItems;
    return actualSelectedItems.map(singleSelectedItem => {
      const item = this._findItem(singleSelectedItem);
      if (!item[displayKey]) return null;
      return (
        <View
          style={[
            styles.selectedItem,
            {
              width: item[displayKey].length * 8 + 60,
              justifyContent: 'center',
              height: 40,
              borderColor: tagBorderColor
            },
            tagContainerStyle || {}
          ]}
          key={item[uniqueKey]}
        >
          <Text
            style={[
              {
                flex: 1,
                color: tagTextColor,
                fontSize: 15, 
              },
              styleTextTag && styleTextTag,
              fontFamily ? { fontFamily } : {}
            ]}
            numberOfLines={1}
          >
            {item[displayKey]}
          </Text>
          <TouchableOpacity
            onPress={() => {
              this._removeItem(item);
            }}
          >
            <Icon
              name="close-circle"
              style={{
                color: tagRemoveIconColor,
                fontSize: 22,
                marginLeft: 10
              }}
            />
          </TouchableOpacity>
        </View>
      );
    });
  };

  _removeItem = item => {
    const { uniqueKey, selectedItems, onSelectedItemsChange } = this.props;
    const newItems = reject(
      selectedItems,
      singleItem => item[uniqueKey] === singleItem
    );
    // broadcast new selected items state to parent component
    onSelectedItemsChange(newItems);
  };

  _removeAllItems = () => {
    const { onSelectedItemsChange } = this.props;
    // broadcast new selected items state to parent component
    onSelectedItemsChange([]);
  };

  _clearSelector = () => {
    this.setState({
      selector: false
    });
  };

  _clearSelectorCallback = () => {
    const { onClearSelector } = this.props;
    this._clearSelector();
    if (onClearSelector) {
      onClearSelector();
    }
  };

  _toggleSelector = () => {
    const { onToggleList } = this.props;
    this.setState({
      selector: !this.state.selector
    });
    if (onToggleList) {
      onToggleList();
    }
  };

  _clearSearchTerm = () => {
    this.setState({
      searchTerm: ''
    });
  };

  _submitSelection = () => {
    this._toggleSelector();
    // reset searchTerm
    this._clearSearchTerm();
  };

  _itemSelected = item => {
    const { uniqueKey, selectedItems } = this.props;
    return selectedItems.indexOf(item[uniqueKey]) !== -1;
  };

  _addItem = () => {
    const {
      uniqueKey,
      items,
      selectedItems,
      onSelectedItemsChange,
      onAddItem
    } = this.props;
    let newItems = [];
    let newSelectedItems = [];
    const newItemName = this.state.searchTerm;
    if (newItemName) {
      const newItemId = newItemName
        .split(' ')
        .filter(word => word.length)
        .join('-');
      newItems = [...items, { [uniqueKey]: newItemId, name: newItemName }];
      newSelectedItems = [...selectedItems, newItemId];
      onAddItem(newItems);
      onSelectedItemsChange(newSelectedItems);
      this._clearSearchTerm();
    }
  };

  _toggleItem = item => {
    const {
      single,
      uniqueKey,
      selectedItems,
      onSelectedItemsChange
    } = this.props;
    if (single) {
      this._submitSelection();
      onSelectedItemsChange([item[uniqueKey]]);
    } else {
      const status = this._itemSelected(item);
      let newItems = [];
      if (status) {
        newItems = reject(
          selectedItems,
          singleItem => item[uniqueKey] === singleItem
        );
      } else {
        newItems = [...selectedItems, item[uniqueKey]];
      }
      // broadcast new selected items state to parent component
      onSelectedItemsChange(newItems);
    }
  };

  _itemStyle = item => {
    const {
      selectedItemFontFamily,
      selectedItemTextColor,
      itemFontFamily,
      itemTextColor,
      itemFontSize
    } = this.props;
    const isSelected = this._itemSelected(item);
    const fontFamily = {};
    if (isSelected && selectedItemFontFamily) {
      fontFamily.fontFamily = selectedItemFontFamily;
    } else if (!isSelected && itemFontFamily) {
      fontFamily.fontFamily = itemFontFamily;
    }
    const color = isSelected
      ? { color: selectedItemTextColor }
      : { color: itemTextColor };
    return {
      ...fontFamily,
      ...color,
      fontSize: itemFontSize
    };
  };

  _getRow = item => {
    const { selectedItemIconColor, displayKey, styleRowList } = this.props;
    return (
      <TouchableOpacity
        disabled={item.disabled}
        onPress={() => this._toggleItem(item)}
        style={[
          styleRowList && styleRowList,
          { paddingLeft: 20, paddingRight: 20 }
        ]}
      >
        <View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text
              style={[
                {
                  flex: 1,
                  fontSize: 16,
                  paddingTop: 5,
                  paddingBottom: 5
                },
                this._itemStyle(item),
                item.disabled ? { color: 'grey' } : {}
              ]}
            >
              {item[displayKey]}
            </Text>
            {this._itemSelected(item) ? (
              <Icon
                name="check"
                style={{
                  fontSize: 20,
                  color: selectedItemIconColor
                }}
              />
            ) : null}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  _getRowNew = item => (
    <TouchableOpacity
      disabled={item.disabled}
      onPress={() => this._addItem(item)}
      style={{ paddingLeft: 20, paddingRight: 20 }}
    >
      <View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text
            style={[
              {
                flex: 1,
                fontSize: 16,
                paddingTop: 5,
                paddingBottom: 5
              },
              this._itemStyle(item),
              item.disabled ? { color: 'grey' } : {}
            ]}
          >
            Add {item.name} (tap or press return)
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  _filterItems = searchTerm => {
    switch (this.props.filterMethod) {
      case 'full':
        return this._filterItemsFull(searchTerm);
      default:
        return this._filterItemsPartial(searchTerm);
    }
  };

  _filterItemsPartial = searchTerm => {
    const { items, displayKey } = this.props;
    const filteredItems = [];
    items.forEach(item => {
      const parts = searchTerm.trim().split(/[ \-:]+/);
      const regex = new RegExp(`(${parts.join('|')})`, 'ig');
      if (regex.test(get(item, displayKey))) {
        filteredItems.push(item);
      }
    });
    return filteredItems;
  };

  _filterItemsFull = searchTerm => {
    const { items, displayKey } = this.props;
    const filteredItems = [];
    items.forEach(item => {
      if (
        item[displayKey]
          .toLowerCase()
          .indexOf(searchTerm.trim().toLowerCase()) >= 0
      ) {
        filteredItems.push(item);
      }
    });
    return filteredItems;
  };

  _renderItems = () => {
    const {
      canAddItems,
      items,
      fontFamily,
      uniqueKey,
      selectedItems,
      flatListProps,
      styleListContainer,
      removeSelected,
      noItemsText
    } = this.props;
    const { searchTerm } = this.state;
    let component = null;
    // If searchTerm matches an item in the list, we should not add a new
    // element to the list.
    let searchTermMatch;
    let itemList;
    let addItemRow;
    let renderItems = searchTerm ? this._filterItems(searchTerm) : items;
    // Filtering already selected items
    if (removeSelected) {
      renderItems = renderItems.filter(
        item => !selectedItems.includes(item[uniqueKey])
      );
    }
    if (renderItems.length) {
      itemList = (
        <FlatList
          data={renderItems}
          initialNumToRender={10}
          extraData={selectedItems}
          keyExtractor={(item, index) => index.toString()}
          listKey={item => item[uniqueKey]}
          renderItem={rowData => this._getRow(rowData.item)}
          {...flatListProps}
          style={{
            flexGrow: 1,
            height:170,
          }}
        />
      );
      searchTermMatch = renderItems.filter(item => item.name === searchTerm)
        .length;
    } else if (!canAddItems) {
      itemList = (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text
            style={[
              {
                flex: 1,
                marginTop: 20,
                textAlign: 'center',
                color: colorPack.danger
              },
              fontFamily ? { fontFamily } : {}
            ]}
          >
            {noItemsText}
          </Text>
        </View>
      );
    }

    if (canAddItems && !searchTermMatch && searchTerm.length) {
      addItemRow = this._getRowNew({ name: searchTerm });
    }
    component = (
      <View style={styleListContainer && styleListContainer}>
        {itemList}
        {addItemRow}
      </View>
    );
    return component;
  };

  render() {
    const {
      selectedItems,
      single,
      fontFamily,
      altFontFamily,
      searchInputPlaceholderText,
      searchInputStyle,
      styleDropdownMenu,
      styleDropdownMenuSubsection,
      hideSubmitButton,
      hideDropdown,
      fontSize,
      textColor,
      fixedHeight,
      hideTags,
      textInputProps,
      styleMainWrapper,
      styleInputGroup,
      styleItemsContainer,
      styleSelectorContainer,
      styleTextDropdown,
      styleTextDropdownSelected,
      searchIcon,
      styleIndicator,
    } = this.props;
    const { searchTerm, selector } = this.state;
    return (
      <View
        style={[
          {
            flexDirection: 'column'
          } &&
          styleMainWrapper &&
          styleMainWrapper, 
        ]}
      >
        {selector ? (
          <View
            style={[
              styles.selectorView(fixedHeight),
              styleSelectorContainer && styleSelectorContainer, 
            ]}
          >
            <View
              style={[styles.inputGroup, styleInputGroup && styleInputGroup]}
            >
              {searchIcon}
              <TextInput
                autoFocus
                onChangeText={this._onChangeInput}
                onSubmitEditing={this._addItem}
                placeholder={searchInputPlaceholderText}
                placeholderTextColor={colorPack.placeholderTextColor}
                underlineColorAndroid="transparent"
                style={[searchInputStyle, {flex: 1, fontSize:18}]}
                value={searchTerm}
                {...textInputProps}
              /> 
              {hideSubmitButton && (
                <TouchableOpacity onPress={this._submitSelection}>
                  <Icon
                    name="menu-down"
                    size={30}
                    color={colorPack.iconColor}
                    style={[
                      { paddingLeft: 15, paddingRight: 15 },
                    ]}
                  />
                </TouchableOpacity>
              )}
              {!hideDropdown && (
                <Icon
                  name="menu-up"
                  size={30}
                  onPress={this._clearSelectorCallback}
                  color={colorPack.iconColor}
                  style={{ marginLeft: 5 }}
                />
              )}
            </View>
            <View
              style={{
                flexDirection: 'column',
                backgroundColor: '#fafafa'
              }}
            >
              <View style={styleItemsContainer && styleItemsContainer}>
                {this._renderItems()}
              </View>
              {!single && !hideSubmitButton}
            </View>
          </View>
        ) : (
          <View>
            <View
              style={[
                styles.dropdownView,
                styleDropdownMenu && styleDropdownMenu
              ]}
            >
              <View
                style={[
                  styles.subSection,
                  { paddingTop: 10, paddingBottom: 10 },
                  styleDropdownMenuSubsection && styleDropdownMenuSubsection
                ]}
              >
                <TouchableWithoutFeedback onPress={this._toggleSelector}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      alignItems: 'center'
                    }}
                  >
                    <Text
                      style={
                        !selectedItems || selectedItems.length === 0
                          ? [
                            {
                              flex: 1,
                              fontSize: 18,
                              color:
                                textColor || colorPack.placeholderTextColor
                            },
                            styleTextDropdown && styleTextDropdown,
                            altFontFamily
                              ? { fontFamily: altFontFamily }
                              : fontFamily
                                ? { fontFamily }
                                : {}
                          ]
                          : [
                            {
                              flex: 1,
                              fontSize: fontSize || 16,
                              color:
                                textColor || colorPack.placeholderTextColor
                            },
                            styleTextDropdownSelected &&
                            styleTextDropdownSelected
                          ]
                      }
                      numberOfLines={1}
                    >
                      {this._getSelectLabel()}
                    </Text>
                    <Icon
                      name={hideSubmitButton ? 'menu-right' : 'menu-down'}
                      style={[
                        styles.indicator,
                        styleIndicator && styleIndicator,
                      ]}
                      color={colorPack.iconColor}
                    />
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </View>
            {!single && !hideTags && selectedItems.length ? (
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap'
                }}
              >
                {this._displaySelectedItems()}
              </View>
            ) : null}
          </View>
        )}
      </View>
    );
  }
}