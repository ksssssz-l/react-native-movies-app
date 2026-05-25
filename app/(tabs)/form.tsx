import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useState } from 'react';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { MovieType } from '@/types/movie';
import { FilterButton } from '@/components/filter-button';
import { ThemeToggle } from '@/components/theme-toggle';

type FormState = {
  title: string;
  type: MovieType | '';
  genre: string;
  creator: string;
  year: string;
  rating: string;
  comment: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const GENRES = [
  'Action', 'Animation', 'Aventure', 'Comédie', 'Crime',
  'Drame', 'Fantastique', 'Guerre', 'Historique', 'Horreur',
  'Mystère', 'Romance', 'Science-fiction', 'Thriller',
];

function validate(form: FormState): FormErrors {
  const errs: FormErrors = {};

  if (!form.title.trim()) errs.title = 'Le titre est obligatoire.';
  if (!form.type) errs.type = 'Le type est obligatoire.';
  if (!form.genre) errs.genre = 'Le genre est obligatoire.';

  if (!form.year.trim()) {
    errs.year = "L'année est obligatoire.";
  } else {
    const y = parseInt(form.year, 10);
    if (isNaN(y) || y < 1888 || y > new Date().getFullYear() + 5) {
      errs.year = 'Année invalide.';
    }
  }

  if (form.rating) {
    const r = parseFloat(form.rating.replace(',', '.'));
    if (isNaN(r) || r < 0 || r > 5) {
      errs.rating = 'La note doit être entre 0 et 5.';
    }
  }

  if (form.comment && form.comment.trim().length < 20) {
    errs.comment = 'Le commentaire doit faire au moins 20 caractères.';
  }

  return errs;
}

const EMPTY_FORM: FormState = {
  title: '',
  type: '',
  genre: '',
  creator: '',
  year: '',
  rating: '',
  comment: '',
};

export default function FormScreen() {
  const scheme = useColorScheme() ?? 'light';
  const colors = Colors[scheme];

  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm(f => ({ ...f, [key]: value }));
    if (errors[key]) setErrors(e => ({ ...e, [key]: undefined }));
  }

  function handleSubmit() {
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmitted(true);
  }

  function handleReset() {
    setForm(EMPTY_FORM);
    setErrors({});
    setSubmitted(false);
  }

  const inputStyle = [
    styles.input,
    { backgroundColor: colors.icon + '18', color: colors.text, borderColor: colors.icon + '44' },
  ];

  if (submitted) {
    return (
      <View style={[styles.successContainer, { backgroundColor: colors.background }]}>
        <Text style={styles.successEmoji}>✅</Text>
        <Text style={[styles.successTitle, { color: colors.text }]}>
          Recommandation envoyée !
        </Text>
        <Text style={[styles.successSubtitle, { color: colors.icon }]}>
          Merci pour votre recommandation : « {form.title} »
        </Text>
        <Pressable style={[styles.btn, { backgroundColor: colors.tint }]} onPress={handleReset}>
          <Text style={styles.btnText}>Nouvelle recommandation</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled">
      <View style={styles.titleRow}>
        <Text style={[styles.pageTitle, { color: colors.text }]}>Recommander</Text>
        <ThemeToggle />
      </View>
      <Text style={[styles.pageSubtitle, { color: colors.icon }]}>
        Partagez un titre avec la communauté
      </Text>

      <View style={styles.field}>
        <Text style={[styles.label, { color: colors.text }]}>Titre *</Text>
        <TextInput
          style={inputStyle}
          placeholder="Ex : Dune, Severance..."
          placeholderTextColor={colors.icon}
          value={form.title}
          onChangeText={v => set('title', v)}
        />
        {errors.title && <Text style={styles.error}>{errors.title}</Text>}
      </View>

      <View style={styles.field}>
        <Text style={[styles.label, { color: colors.text }]}>Type *</Text>
        <View style={styles.row}>
          <FilterButton
            label="🎬 Film"
            active={form.type === 'movie'}
            onPress={() => set('type', 'movie')}
          />
          <FilterButton
            label="📺 Série"
            active={form.type === 'series'}
            onPress={() => set('type', 'series')}
          />
        </View>
        {errors.type && <Text style={styles.error}>{errors.type}</Text>}
      </View>

      <View style={styles.field}>
        <Text style={[styles.label, { color: colors.text }]}>Genre *</Text>
        <View style={styles.genreGrid}>
          {GENRES.map(g => (
            <FilterButton
              key={g}
              label={g}
              active={form.genre === g}
              onPress={() => set('genre', g)}
            />
          ))}
        </View>
        {errors.genre && <Text style={styles.error}>{errors.genre}</Text>}
      </View>

      <View style={styles.field}>
        <Text style={[styles.label, { color: colors.text }]}>Réalisateur / Créateur</Text>
        <TextInput
          style={inputStyle}
          placeholder="Ex : Christopher Nolan"
          placeholderTextColor={colors.icon}
          value={form.creator}
          onChangeText={v => set('creator', v)}
        />
      </View>

      <View style={styles.rowFields}>
        <View style={[styles.field, { flex: 1 }]}>
          <Text style={[styles.label, { color: colors.text }]}>Année *</Text>
          <TextInput
            style={inputStyle}
            placeholder="2024"
            placeholderTextColor={colors.icon}
            value={form.year}
            onChangeText={v => set('year', v)}
            keyboardType="numeric"
            maxLength={4}
          />
          {errors.year && <Text style={styles.error}>{errors.year}</Text>}
        </View>

        <View style={[styles.field, { flex: 1 }]}>
          <Text style={[styles.label, { color: colors.text }]}>Note (0–5)</Text>
          <TextInput
            style={inputStyle}
            placeholder="4.5"
            placeholderTextColor={colors.icon}
            value={form.rating}
            onChangeText={v => set('rating', v)}
            keyboardType="decimal-pad"
          />
          {errors.rating && <Text style={styles.error}>{errors.rating}</Text>}
        </View>
      </View>

      <View style={styles.field}>
        <Text style={[styles.label, { color: colors.text }]}>
          Commentaire
          {form.comment ? ` (${form.comment.trim().length} car.)` : ''}
        </Text>
        <TextInput
          style={[inputStyle, styles.textArea]}
          placeholder="Votre avis en quelques mots... (20 caractères minimum)"
          placeholderTextColor={colors.icon}
          value={form.comment}
          onChangeText={v => set('comment', v)}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />
        {errors.comment && <Text style={styles.error}>{errors.comment}</Text>}
      </View>

      <Pressable style={[styles.btn, { backgroundColor: colors.tint }]} onPress={handleSubmit}>
        <Text style={styles.btnText}>Envoyer la recommandation</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 60,
    gap: 20,
    paddingBottom: 48,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  pageSubtitle: {
    fontSize: 14,
    marginTop: -12,
  },
  field: {
    gap: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
  },
  input: {
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
    borderWidth: 1,
  },
  textArea: {
    height: 100,
    paddingTop: 10,
  },
  row: {
    flexDirection: 'row',
    gap: 8,
  },
  rowFields: {
    flexDirection: 'row',
    gap: 12,
  },
  genreGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  error: {
    color: '#e53935',
    fontSize: 12,
  },
  btn: {
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  successContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    gap: 16,
  },
  successEmoji: {
    fontSize: 64,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  successSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
});
