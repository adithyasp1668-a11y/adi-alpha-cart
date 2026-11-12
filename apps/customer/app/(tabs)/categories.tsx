import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { CATEGORIES_DATA } from '@alpha-cart/shared-config';

export default function AllCategoriesScreen() {
  const router = useRouter();

  const handleSelectCategory = (slug: string) => {
    if (slug === 'food') {
      router.push('/food');
    } else {
      router.push({ pathname: '/(tabs)', params: { category: slug } });
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#0F172A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Categories</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.contentList} showsVerticalScrollIndicator={false}>
        {CATEGORIES_DATA.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            style={[styles.categoryCard, { backgroundColor: cat.lightBgColor }]}
            activeOpacity={0.88}
            onPress={() => handleSelectCategory(cat.slug)}
          >
            <View style={styles.cardDetails}>
              <View style={styles.titleRow}>
                <Text style={styles.categoryName}>{cat.name}</Text>
                <Ionicons name="arrow-forward-circle" size={22} color={cat.accentColor} />
              </View>
              <Text style={styles.categoryDesc}>{cat.description}</Text>
              <View style={styles.itemCountTag}>
                <Text style={[styles.itemCountText, { color: cat.accentColor }]}>
                  {cat.itemCount}+ Items Available
                </Text>
              </View>
            </View>

            <Image source={{ uri: cat.image }} style={styles.categoryImage} resizeMode="cover" />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 54,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
  },
  backBtn: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
  },
  contentList: {
    padding: 20,
    gap: 16,
  },
  categoryCard: {
    borderRadius: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.04)',
    overflow: 'hidden',
  },
  cardDetails: {
    flex: 1,
    paddingRight: 12,
    gap: 6,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  categoryName: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
  },
  categoryDesc: {
    fontSize: 13,
    color: '#475569',
    lineHeight: 18,
  },
  itemCountTag: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginTop: 6,
  },
  itemCountText: {
    fontSize: 11,
    fontWeight: '700',
  },
  categoryImage: {
    width: 90,
    height: 90,
    borderRadius: 18,
  },
});
