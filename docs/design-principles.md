# Design principles

These rules define the shared interface language for clinic staff. Use them when adding any screen or component.

## Hierarchy

- Give each screen one clear title and one primary action. Keep secondary actions visually quieter.
- Group information by the task staff are doing. Use headings, labels, and whitespace before adding another container or card.
- Show status with concise text and color together. Never make color the only signal.

## Spacing and shape

- Use a consistent 4 px rhythm: 4, 8, 12, 16, 24, 32, and 48 px are the common steps.
- Align labels, fields, table columns, and actions to shared edges. Keep compact controls around 36–40 px high and primary touch targets at least 44 px where practical.
- Use modest radii (6–12 px) and subtle borders. Reserve shadows for clear layering, not decoration.

## Typography

- Use the shared sans-serif UI stack. Use tabular numerals for times, counts, and measurements.
- Keep body copy at 14–16 px and supporting labels at 12 px or larger for routine use. Use smaller text only for nonessential metadata.
- Use weight and size to establish hierarchy; avoid all-caps for long labels and avoid long lines of text.

## Color

- Use CSS tokens from `globals.css`: warm paper for the page, white for working surfaces, dark ink for text, and evergreen teal for primary actions.
- Keep semantic success, warning, and danger colors restrained and consistent. Check text/background contrast for normal and hover states.
- Do not introduce one-off raw color values in components. Add or adjust a token when a genuine reusable need appears.

## Tables

- Use real table markup with captions (visually hidden when redundant), column headers, and scoped header cells.
- Keep rows readable and scannable with restrained separators, aligned values, and compact status badges. Avoid heavy grids and excessive row decoration.
- On small screens, preserve access to all columns with a deliberate responsive layout or horizontal scrolling; never silently hide important values.

## Forms

- Place a visible, programmatically associated label next to every field. Use hints for format expectations and errors adjacent to the affected field.
- Match control heights, border color, and radii. Keep placeholder text supplementary, never a substitute for a label.
- Make validation specific, actionable, and announced accessibly. Preserve entered values when a recoverable error occurs.

## Navigation

- Make the current location clear. Keep navigation names concise and stable.
- Use links to move between locations and buttons to perform actions. Maintain a predictable focus order and keyboard operation.
- Group destinations by the clinic team's work and show the active route distinctly. Keep global navigation compact and limited to real destinations.
- Use a route-group layout when pages share the application shell but a public preview or other standalone page should remain outside it.

## Accessibility and responsive behaviour

- Use semantic landmarks, headings in order, descriptive link names, and accessible names for icon-only controls.
- Support keyboard use, visible `:focus-visible` styles, reduced motion, zoom, and contrast that remains legible in bright clinic settings.
- Start with a narrow layout and expand deliberately. At small widths, stack related controls and allow data tables to scroll without clipping.
- Do not rely on hover to reveal required actions or information.

## Feedback states

- Plan loading, empty, error, success, and validation states for each relevant screen before implementation.
- Explain what happened and the next useful action. Use status/alert semantics appropriate to urgency; avoid disappearing messages for important errors.
- Keep disabled states distinct and explain prerequisites when users need to act.
