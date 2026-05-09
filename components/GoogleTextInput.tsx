import React, { useState, useEffect, useCallback } from "react";
import { View, Image, TextInput, FlatList, TouchableOpacity, Text, StyleSheet } from "react-native";

import { icons } from "@/constants";
import { GoogleInputProps } from "@/types/type";

const locationIQApiKey = process.env.EXPO_PUBLIC_DIRECTIONS_API_KEY;

const GoogleTextInput = ({
  icon,
  initialLocation,
  containerStyle,
  textInputBackgroundColor,
  handlePress,
}: GoogleInputProps) => {
  const [query, setQuery] = useState(initialLocation || "");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const fetchSuggestions = useCallback(async (text: string) => {
    if (text.length < 3) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `https://api.locationiq.com/v1/autocomplete.php?key=${locationIQApiKey}&q=${text}&format=json`
      );
      const data = await response.json();
      if (Array.isArray(data)) {
        setSuggestions(data);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error("LocationIQ Error:", error);
    }
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query) fetchSuggestions(query);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query, fetchSuggestions]);

  return (
    <View className={`flex relative z-50 rounded-xl ${containerStyle}`}>
      <View
        style={[
          styles.inputContainer,
          { backgroundColor: textInputBackgroundColor || "white" },
        ]}
      >
        <View className="justify-center items-center w-6 h-6 ml-4">
          <Image
            source={icon ? icon : icons.search}
            className="w-6 h-6"
            resizeMode="contain"
          />
        </View>
        <TextInput
          style={[styles.input, { backgroundColor: textInputBackgroundColor || "white" }]}
          placeholder={initialLocation ?? "Where do you want to go?"}
          placeholderTextColor="gray"
          value={query}
          onChangeText={(text) => {
            setQuery(text);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
        />
      </View>

      {showSuggestions && suggestions.length > 0 && (
        <View
          style={[
            styles.listView,
            { backgroundColor: textInputBackgroundColor || "white" },
          ]}
        >
          <FlatList
            data={suggestions}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  setQuery(item.display_name);
                  setShowSuggestions(false);
                  handlePress({
                    latitude: parseFloat(item.lat),
                    longitude: parseFloat(item.lon),
                    address: item.display_name,
                  });
                }}
                style={styles.suggestionItem}
              >
                <Text numberOfLines={1} style={styles.suggestionText}>
                  {item.display_name}
                </Text>
              </TouchableOpacity>
            )}
            style={{ maxHeight: 200 }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    marginHorizontal: 20,
    shadowColor: "#d4d4d4",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    height: 50,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  listView: {
    position: "absolute",
    top: 55,
    left: 20,
    right: 20,
    borderRadius: 10,
    shadowColor: "#d4d4d4",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    zIndex: 99,
  },
  suggestionItem: {
    padding: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: "#eee",
  },
  suggestionText: {
    fontSize: 14,
    color: "#333",
  },
});

export default GoogleTextInput;
