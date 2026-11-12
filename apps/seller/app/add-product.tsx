import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Switch,
  Image,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@alpha-cart/shared-config';
import { mockStore } from '@alpha-cart/api-client';

const CATEGORY_CHOICES = ['Biryani', 'Starters', 'Beverages', 'Main Course', 'Desserts', 'Snacks'];

export default function AddEditProductScreen() {
  const router = useRouter();
  const [productName, setProductName] = useState('Chicken Biryani');
  const [category, setCategory] = useState('Biryani');
  const [price, setPrice] = useState('199');
  const [isAvailable, setIsAvailable] = useState(true);
  const [imageUri, setImageUri] = useState('https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80');

  const handleSave = () => {
    if (!productName.trim() || !price.trim()) {
      Alert.alert('Required Fields', 'Please enter a product name and price.');
      return;
    }

    mockStore.addProduct({
      name: productName,
      slug: productName.toLowerCase().replace(/\s+/g, '-'),
      description: 'Freshly prepared specialty dish from store kitchen.',
      price: parseFloat(price) || 199,
      businessType: 'food',
      categoryId: 'cat-food',
      categoryName: category,
      shopId: 'shop-spice-haven',
      shopName: 'The Spice Haven',
      image: imageUri,
      isAvailable,
      stockCount: isAvailable ? 25 : 0,
      unit: '1 Serving',
      isVeg: false,
    });

    Alert.alert('Product Saved', `"${productName}" is now active in your store catalog!`);
    router.back();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#0F172A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add / Edit Product</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Photo Upload Card (Exact match to reference mockup) */}
        <View style={styles.photoUploadContainer}>
          <Image source={{ uri: imageUri }} style={styles.previewImage} />
          <TouchableOpacity
            style={styles.cameraBadge}
            onPress={() => Alert.alert('Upload Photo', 'Take photo or choose from device gallery')}
          >
            <Ionicons name="camera" size={18} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Product Name Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Product Name</Text>
          <TextInput
            style={styles.input}
            value={productName}
            onChangeText={setProductName}
            placeholder="e.g. Chicken Dum Biryani"
            placeholderTextColor="#94A3B8"
          />
        </View>

        {/* Category Selector */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Category</Text>
          <View style={styles.categoryChipsRow}>
            {CATEGORY_CHOICES.map((c) => (
              <TouchableOpacity
                key={c}
                style={[styles.catChip, category === c && styles.catChipActive]}
                onPress={() => setCategory(c)}
              >
                <Text style={[styles.catChipText, category === c && styles.catChipTextActive]}>
                  {c}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Price Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Price (₹)</Text>
          <View style={styles.priceInputWrap}>
            <Text style={styles.currencyPrefix}>₹</Text>
            <TextInput
              style={styles.priceInput}
              value={price}
              onChangeText={setPrice}
              keyboardType="numeric"
              placeholder="199"
              placeholderTextColor="#94A3B8"
            />
          </View>
        </View>

        {/* Availability Switch */}
        <View style={styles.availabilityRow}>
          <View>
            <Text style={styles.availTitle}>Availability</Text>
            <Text style={styles.availSub}>
              {isAvailable ? 'Item is in stock and purchasable' : 'Item is marked out of stock'}
            </Text>
          </View>
          <Switch
            value={isAvailable}
            onValueChange={setIsAvailable}
            trackColor={{ false: '#CBD5E1', true: '#86EFAC' }}
            thumbColor={isAvailable ? '#16A34A' : '#94A3B8'}
          />
        </View>
      </ScrollView>

      {/* Save Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.saveBtn}
          activeOpacity={0.88}
          onPress={handleSave}
        >
          <Text style={styles.saveBtnText}>Save Product</Text>
        </TouchableOpacity>
      </View>
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
  content: {
    padding: 20,
    gap: 20,
    paddingBottom: 100,
  },
  photoUploadContainer: {
    alignSelf: 'center',
    position: 'relative',
    width: 140,
    height: 140,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  cameraBadge: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  inputGroup: {
    gap: 8,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  input: {
    height: 52,
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 14,
    paddingHorizontal: 16,
    fontSize: 15,
    fontWeight: '600',
    color: '#0F172A',
  },
  categoryChipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  catChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  catChipActive: {
    backgroundColor: '#FFF3E0',
    borderColor: COLORS.primary,
  },
  catChipText: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '600',
  },
  catChipTextActive: {
    color: COLORS.primary,
    fontWeight: '700',
  },
  priceInputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 14,
    paddingHorizontal: 16,
  },
  currencyPrefix: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.primary,
    marginRight: 6,
  },
  priceInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  availabilityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  availTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  availSub: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    paddingBottom: 28,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  saveBtn: {
    backgroundColor: COLORS.primary,
    height: 52,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  saveBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
