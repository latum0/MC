"use client"

import { useState } from "react"
import "./Checkout.css"
import { DollarSign } from 'lucide-react'

const Checkout = () => {
  // État pour le formulaire
  const [formData, setFormData] = useState({
    city: "",
    phoneNumber: "",
    email: "",
    saveInfo: true,
    paymentMethod: "card",
  })

  // État pour la carte sélectionnée
  const [selectedCard, setSelectedCard] = useState("visa")

  // État pour le code promo
  const [couponCode, setCouponCode] = useState("")

  // Gérer les changements dans le formulaire
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  // Gérer le changement de méthode de paiement
  const handlePaymentMethodChange = (method) => {
    setFormData({
      ...formData,
      paymentMethod: method,
    })
  }

  // Gérer la sélection de carte
  const handleCardSelection = (card) => {
    setSelectedCard(card)
  }

  // Gérer la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault()
    // Ici, vous pourriez envoyer les données à votre API
    console.log("Données du formulaire:", formData)
    console.log("Carte sélectionnée:", selectedCard)
    alert("Commande passée avec succès!")
  }

  // Gérer l'application du code promo
  const handleApplyCoupon = () => {
    if (couponCode.trim() === "") {
      alert("Veuillez entrer un code promo")
      return
    }

    // Ici, vous pourriez vérifier le code promo avec votre API
    alert(`Code promo "${couponCode}" appliqué!`)
  }

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <div className="checkout-grid">
          {/* Formulaire de commande */}
          <div className="order-form">
            <h1 className="page-title">Passer une commande</h1>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="city">
                  Ville / Localité <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phoneNumber">
                  Numéro de téléphone <span className="required">*</span>
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">
                  Adresse e-mail <span className="required">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group checkbox-group">
                <input
                  type="checkbox"
                  id="saveInfo"
                  name="saveInfo"
                  checked={formData.saveInfo}
                  onChange={handleInputChange}
                />
                <label htmlFor="saveInfo">Enregistrer ces informations pour la prochaine fois</label>
              </div>
            </form>
          </div>

          {/* Résumé de la commande */}
          <div className="order-summary">
            <div className="summary-item">
              <span>Livraison:</span>
              <span className="summary-value">Gratuite</span>
            </div>

            <div className="summary-item total">
              <span>Total:</span>
              <span className="summary-value">1750 €</span>
            </div>

            <div className="payment-section">
              <h2>Méthode de paiement</h2>

              <div className="payment-options">
                <div className="payment-option">
                  <div className="payment-radio">
                    <input
                      type="radio"
                      id="card-payment"
                      name="payment-method"
                      checked={formData.paymentMethod === "card"}
                      onChange={() => handlePaymentMethodChange("card")}
                    />
                    <label htmlFor="card-payment">Carte bancaire</label>
                  </div>
                </div>

                {formData.paymentMethod === "card" && (
                  <div className="card-selection">
                    <button
                      type="button"
                      className={`card-button ${selectedCard === "visa" ? "selected" : ""}`}
                      onClick={() => handleCardSelection("visa")}
                    >
                      <div className="card-logo visa">VISA</div>
                      <span className="card-name">Visa</span>
                    </button>

                    <button
                      type="button"
                      className={`card-button ${selectedCard === "mastercard" ? "selected" : ""}`}
                      onClick={() => handleCardSelection("mastercard")}
                    >
                      <div className="card-logo mastercard"></div>
                      <span className="card-name">Mastercard</span>
                    </button>

                    
                  </div>
                )}

                <div className="payment-option">
                  <div className="payment-radio">
                    <input
                      type="radio"
                      id="cash-payment"
                      name="payment-method"
                      checked={formData.paymentMethod === "cash"}
                      onChange={() => handlePaymentMethodChange("cash")}
                    />
                    <label htmlFor="cash-payment">
                      
                      Paiement à la livraison
                    </label>
                  </div>
                </div>
              </div>

              <div className="coupon-section">
                <input
                  type="text"
                  placeholder="Code promo"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
                <button className="apply-coupon" onClick={handleApplyCoupon}>
                  Appliquer
                </button>
              </div>

              <button className="place-order-btn" onClick={handleSubmit}>
                Passer la commande
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
