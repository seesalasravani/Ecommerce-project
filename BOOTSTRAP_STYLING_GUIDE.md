# E-Commerce App - Bootstrap & Styling Guide

## 📦 Bootstrap Installation

React Bootstrap and Bootstrap CSS have been successfully installed and configured.

### Import in Your Files:
```jsx
import { Button, Card, Alert, Badge, Form, Table, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Already imported in main.jsx
```

---

## 🎨 Available CSS Variables

All custom colors are defined in `src/index.css` under `:root`:

```css
--primary: #232f3e           /* Dark Navy */
--primary-light: #37475a     /* Light Navy */
--secondary: #ff9900         /* Orange/Gold */
--secondary-hover: #ffac33   /* Light Orange */
--background: #f5f5f5        /* Light Gray */
--surface: #ffffff           /* White */
--text: #111111              /* Almost Black */
--text-muted: #666666        /* Medium Gray */
--border: #e0e0e0            /* Light Border */
--error: #c40000             /* Red */
--success: #067d62           /* Green */
--shadow: 0 1px 3px rgba(0,0,0,0.08)
--shadow-lg: 0 4px 12px rgba(0,0,0,0.12)
--radius: 8px
--transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)
```

---

## 🔘 Button Components

### Basic Buttons
```jsx
<button className="btn btn-primary">Primary Button</button>
<button className="btn btn-outline">Outline Button</button>
```

### Bootstrap Buttons
```jsx
import { Button } from 'react-bootstrap';

<Button variant="primary">Primary</Button>
<Button variant="success">Success</Button>
<Button variant="danger">Danger</Button>
<Button variant="outline-primary">Outline</Button>
<Button disabled>Disabled</Button>
```

---

## 📝 Form Components

### Input Fields
```jsx
<input className="input-field" type="text" placeholder="Your text here" />
```

### Bootstrap Forms
```jsx
<Form.Group className="mb-3">
  <Form.Label>Email Address</Form.Label>
  <Form.Control type="email" placeholder="Enter email" />
</Form.Group>

<Form.Check type="checkbox" label="Remember me" />
```

---

## 🏷️ Badge Components

### Usage
```jsx
<span className="badge badge-primary">Primary</span>
<span className="badge badge-secondary">Secondary</span>
<span className="badge badge-success">Success</span>
<span className="badge badge-danger">Danger</span>
```

### Bootstrap Badges
```jsx
<Badge bg="primary">Primary</Badge>
<Badge bg="success">Success</Badge>
<Badge pill bg="danger">Pill Badge</Badge>
```

---

## ⚠️ Alert Components

### CSS Classes
```jsx
<div className="alert alert-info">Info message</div>
<div className="alert alert-success">Success message</div>
<div className="alert alert-warning">Warning message</div>
<div className="alert alert-danger">Error message</div>
```

### Bootstrap Alerts
```jsx
<Alert variant="success">
  <Alert.Heading>Success!</Alert.Heading>
  <p>Your operation was successful.</p>
</Alert>
```

---

## 📊 Table Styles

### Bootstrap Table
```jsx
<Table striped bordered hover>
  <thead>
    <tr>
      <th>Column 1</th>
      <th>Column 2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Data 1</td>
      <td>Data 2</td>
    </tr>
  </tbody>
</Table>
```

---

## 📱 Grid Layout (Bootstrap)

### Responsive Grid
```jsx
<Container>
  <Row className="g-3">
    <Col xs={12} sm={6} md={4} lg={3}>
      Content
    </Col>
  </Row>
</Container>
```

### Grid Breakpoints:
- `xs`: Extra small (< 576px)
- `sm`: Small (≥ 576px)
- `md`: Medium (≥ 768px)
- `lg`: Large (≥ 992px)
- `xl`: Extra large (≥ 1200px)

---

## 🎯 Utility Classes

### Spacing
```css
.mt-1 /* margin-top: 8px */
.mt-2 /* margin-top: 16px */
.mt-3 /* margin-top: 24px */
.mb-1 /* margin-bottom: 8px */
.mb-2 /* margin-bottom: 16px */
.mb-3 /* margin-bottom: 24px */
.p-1  /* padding: 8px */
.p-2  /* padding: 16px */
.p-3  /* padding: 24px */
```

### Text Alignment
```css
.text-center   /* text-align: center */
.text-left     /* text-align: left */
.text-right    /* text-align: right */
.text-muted    /* Color: var(--text-muted) */
.text-success  /* Color: var(--success) */
.text-danger   /* Color: var(--error) */
```

### Flexbox
```css
.d-flex                   /* display: flex */
.align-items-center       /* align-items: center */
.justify-content-between  /* justify-content: space-between */
.gap-2                    /* gap: 16px */
```

### Size
```css
.w-100  /* width: 100% */
.h-100  /* height: 100% */
```

---

## 🎴 Card Components

### Custom CSS Card
```jsx
<div className="card">
  <img src="image.jpg" alt="Card" />
  <div className="card-body">
    <h5>Card Title</h5>
    <p>Card description</p>
  </div>
</div>
```

### Bootstrap Card
```jsx
<Card>
  <Card.Img variant="top" src="image.jpg" />
  <Card.Body>
    <Card.Title>Card Title</Card.Title>
    <Card.Text>Card description</Card.Text>
    <Button variant="primary">Go to</Button>
  </Card.Body>
</Card>
```

---

## 🔔 Modal/Dialog

### Bootstrap Modal
```jsx
const [show, setShow] = useState(false);

<Modal show={show} onHide={() => setShow(false)}>
  <Modal.Header closeButton>
    <Modal.Title>Modal Title</Modal.Title>
  </Modal.Header>
  <Modal.Body>Content here</Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShow(false)}>
      Close
    </Button>
    <Button variant="primary">Save</Button>
  </Modal.Footer>
</Modal>
```

---

## 📄 Breadcrumb Navigation

### Usage
```jsx
<nav className="breadcrumb">
  <span className="breadcrumb-item">Home</span>
  <span className="breadcrumb-item">Products</span>
  <span className="breadcrumb-item active">Product Details</span>
</nav>
```

---

## 🌙 Dark Mode Support

Dark mode is automatically supported! Colors change based on `[data-theme="dark"]` attribute.

### Toggle Dark Mode Function (in Navbar):
```jsx
const toggleTheme = () => {
  const newTheme = theme === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', newTheme);
};
```

---

## 📦 Component Example Usage

See `src/utils/BootstrapComponents.jsx` for complete examples of:
- Button Variants
- Alert Components
- Card Components
- Badge Components
- Form Components
- Grid Layout
- Modal Component
- Table Component
- Pagination

---

## 🎨 Customization

### Add Custom Colors
Edit `:root` in `src/index.css`:
```css
:root {
  --primary: #your-color;
  --secondary: #your-color;
  /* ... add more */
}
```

### Create Custom CSS Classes
```css
.my-custom-card {
  background: linear-gradient(135deg, var(--primary), var(--primary-light));
  border: none;
  border-radius: var(--radius);
  box-shadow: var(--shadow-lg);
}
```

---

## 📱 Responsive Design

All components are fully responsive using Bootstrap's grid system and custom media queries.

### Media Query Breakpoints:
- Desktop: 1280px+ (default)
- Tablet: 768px - 992px
- Mobile: < 768px

---

## 🚀 Performance Tips

1. **Use CSS Classes** instead of inline styles for better performance
2. **Bootstrap Components** provide optimized rendering
3. **CSS Variables** allow theme switching without re-rendering
4. **Lazy Load Images** to improve page speed

---

## 🔗 Useful Resources

- [Bootstrap Documentation](https://getbootstrap.com/)
- [React Bootstrap Docs](https://react-bootstrap.github.io/)
- [CSS Variables Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)

---

## 📞 Support

For issues or questions about Bootstrap integration, refer to:
- react-bootstrap.github.io
- getbootstrap.com/docs
- Lucide React icons: lucide.dev
