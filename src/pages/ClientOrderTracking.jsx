"use client"

import { useState } from "react"
import "./ClientOrderTracking.css"

const ClientOrderTracking = () => {
  const [selectedTab, setSelectedTab] = useState("all")
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false)
  const [reviewText, setReviewText] = useState("")
  const [rating, setRating] = useState(0)
  const [reviewProduct, setReviewProduct] = useState(null)
  const [reportDialogOpen, setReportDialogOpen] = useState(false)
  const [reportReason, setReportReason] = useState("")
  const [reportProduct, setReportProduct] = useState(null)

  // Données d'exemple pour les commandes du client
  const orders = [
    {
      id: "ORD-2023-1234",
      date: "01/05/2024",
      total: "1299,99 €",
      status: "delivered",
      estimatedDelivery: "03/05/2024",
      actualDelivery: "03/05/2024",
      trackingNumber: "TRK123456789",
      carrier: "Chronopost",
      items: [
        {
          id: "PROD-001",
          name: "Boîtier PC Corsair 4000D",
          price: "99,99 €",
          quantity: 1,
          image: "https://placehold.co/80x80",
          reviewed: false,
        },
        {
          id: "PROD-002",
          name: "Carte graphique RTX 4070",
          price: "899,99 €",
          quantity: 1,
          image: "https://placehold.co/80x80",
          reviewed: true,
        },
        {
          id: "PROD-003",
          name: "Mémoire RAM Corsair 32GB",
          price: "149,99 €",
          quantity: 1,
          image: "https://placehold.co/80x80",
          reviewed: false,
        },
      ],
      address: "123 Rue de Paris, 75001 Paris, France",
      payment: "Carte bancaire",
      timeline: [
        { date: "01/05/2024", status: "ordered", message: "Commande reçue" },
        { date: "01/05/2024", status: "processing", message: "Commande en cours de traitement" },
        { date: "02/05/2024", status: "shipped", message: "Commande expédiée" },
        { date: "03/05/2024", status: "delivered", message: "Commande livrée" },
      ],
    },
    {
      id: "ORD-2023-1235",
      date: "30/04/2024",
      total: "2499,99 €",
      status: "shipped",
      estimatedDelivery: "05/05/2024",
      actualDelivery: null,
      trackingNumber: "TRK987654321",
      carrier: "DHL",
      items: [
        {
          id: "PROD-004",
          name: "Razer Blade 15",
          price: "2499,99 €",
          quantity: 1,
          image: "https://placehold.co/80x80",
          reviewed: false,
        },
      ],
      address: "123 Rue de Paris, 75001 Paris, France",
      payment: "PayPal",
      timeline: [
        { date: "30/04/2024", status: "ordered", message: "Commande reçue" },
        { date: "01/05/2024", status: "processing", message: "Commande en cours de traitement" },
        { date: "03/05/2024", status: "shipped", message: "Commande expédiée" },
      ],
    },
    {
      id: "ORD-2023-1236",
      date: "29/04/2024",
      total: "349,97 €",
      status: "processing",
      estimatedDelivery: "06/05/2024",
      actualDelivery: null,
      trackingNumber: "TRK456789123",
      carrier: "Colissimo",
      items: [
        {
          id: "PROD-005",
          name: "Clavier Razer BlackWidow",
          price: "149,99 €",
          quantity: 1,
          image: "https://placehold.co/80x80",
          reviewed: false,
        },
        {
          id: "PROD-006",
          name: "Souris Razer DeathAdder",
          price: "69,99 €",
          quantity: 1,
          image: "https://placehold.co/80x80",
          reviewed: false,
        },
        {
          id: "PROD-007",
          name: "Casque Razer Kraken",
          price: "99,99 €",
          quantity: 1,
          image: "https://placehold.co/80x80",
          reviewed: false,
        },
      ],
      address: "123 Rue de Paris, 75001 Paris, France",
      payment: "Carte bancaire",
      timeline: [
        { date: "29/04/2024", status: "ordered", message: "Commande reçue" },
        { date: "01/05/2024", status: "processing", message: "Commande en cours de traitement" },
      ],
    },
    {
      id: "ORD-2023-1237",
      date: "28/04/2024",
      total: "799,99 €",
      status: "cancelled",
      estimatedDelivery: null,
      actualDelivery: null,
      trackingNumber: null,
      carrier: null,
      items: [
        {
          id: "PROD-008",
          name: "Processeur Intel i9-13900K",
          price: "599,99 €",
          quantity: 1,
          image: "https://placehold.co/80x80",
          reviewed: false,
        },
        {
          id: "PROD-009",
          name: "Ventirad Noctua NH-D15",
          price: "99,99 €",
          quantity: 1,
          image: "https://placehold.co/80x80",
          reviewed: false,
        },
      ],
      address: "123 Rue de Paris, 75001 Paris, France",
      payment: "Carte bancaire",
      timeline: [
        { date: "28/04/2024", status: "ordered", message: "Commande reçue" },
        { date: "28/04/2024", status: "cancelled", message: "Commande annulée" },
      ],
    },
    {
      id: "ORD-2023-1238",
      date: "27/04/2024",
      total: "1899,97 €",
      status: "ordered",
      estimatedDelivery: "07/05/2024",
      actualDelivery: null,
      trackingNumber: null,
      carrier: null,
      items: [
        {
          id: "PROD-010",
          name: "Carte mère ASUS ROG Z790",
          price: "399,99 €",
          quantity: 1,
          image: "https://placehold.co/80x80",
          reviewed: false,
        },
        {
          id: "PROD-011",
          name: "Processeur Intel i7-13700K",
          price: "449,99 €",
          quantity: 1,
          image: "https://placehold.co/80x80",
          reviewed: false,
        },
        {
          id: "PROD-012",
          name: "Carte graphique RTX 4060 Ti",
          price: "499,99 €",
          quantity: 1,
          image: "https://placehold.co/80x80",
          reviewed: false,
        },
      ],
      address: "123 Rue de Paris, 75001 Paris, France",
      payment: "Virement bancaire",
      timeline: [{ date: "27/04/2024", status: "ordered", message: "Commande reçue" }],
    },
  ]

  // Filtrer les commandes en fonction de l'onglet sélectionné
  const filteredOrders = selectedTab === "all" ? orders : orders.filter((order) => order.status === selectedTab)

  // Fonction pour afficher le statut avec la bonne couleur et icône
  const renderStatus = (status) => {
    switch (status) {
      case "delivered":
        return (
          <span className="status-badge status-delivered">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            Livrée
          </span>
        )
      case "processing":
        return (
          <span className="status-badge status-processing">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            En préparation
          </span>
        )
      case "shipped":
        return (
          <span className="status-badge status-shipped">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="1" y="3" width="15" height="13"></rect>
              <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
              <circle cx="5.5" cy="18.5" r="2.5"></circle>
              <circle cx="18.5" cy="18.5" r="2.5"></circle>
            </svg>
            En transit
          </span>
        )
      case "ordered":
        return (
          <span className="status-badge status-ordered">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
            </svg>
            Commandée
          </span>
        )
      case "cancelled":
        return (
          <span className="status-badge status-cancelled">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="15" y1="9" x2="9" y2="15"></line>
              <line x1="9" y1="9" x2="15" y2="15"></line>
            </svg>
            Annulée
          </span>
        )
      default:
        return <span className="status-badge">{status}</span>
    }
  }

  // Fonction pour ouvrir le détail d'une commande
  const openOrderDetails = (order) => {
    setSelectedOrder(order)
  }

  // Fonction pour fermer le modal de détails
  const closeOrderDetails = () => {
    setSelectedOrder(null)
  }

  // Fonction pour ouvrir le dialogue de commentaire
  const openReviewDialog = (product) => {
    setReviewProduct(product)
    setReviewText("")
    setRating(0)
    setReviewDialogOpen(true)
  }

  // Fonction pour soumettre un commentaire
  const submitReview = () => {
    // Ici, vous implémenteriez la logique pour envoyer le commentaire à votre API
    console.log(`Commentaire pour ${reviewProduct?.name}: ${reviewText}, Note: ${rating}/5`)

    // Simuler la mise à jour du produit comme étant commenté
    if (selectedOrder && reviewProduct) {
      const updatedOrders = orders.map((order) => {
        if (order.id === selectedOrder.id) {
          const updatedItems = order.items.map((item) => {
            if (item.id === reviewProduct.id) {
              return { ...item, reviewed: true }
            }
            return item
          })
          return { ...order, items: updatedItems }
        }
        return order
      })

      // Dans une application réelle, vous mettriez à jour l'état avec les nouvelles données
      // setOrders(updatedOrders)
    }

    setReviewDialogOpen(false)
  }

  // Fonction pour ouvrir le dialogue de signalement
  const openReportDialog = (product) => {
    setReportProduct(product)
    setReportReason("")
    setReportDialogOpen(true)
  }

  // Fonction pour soumettre un signalement
  const submitReport = () => {
    // Ici, vous implémenteriez la logique pour envoyer le signalement à votre API
    console.log(`Signalement pour ${reportProduct?.name}: ${reportReason}`)
    setReportDialogOpen(false)
  }

  // Fonction pour calculer la progression de la commande
  const calculateOrderProgress = (order) => {
    const statusSteps = ["ordered", "processing", "shipped", "delivered"]
    const currentStatusIndex = statusSteps.indexOf(order.status)
    if (currentStatusIndex === -1) return 0
    return ((currentStatusIndex + 1) / statusSteps.length) * 100
  }

  return (
    <div className="orders-container">
      <div className="orders-content">
        <div className="orders-header">
          <h1>Mes Commandes</h1>
          <p>Suivez l'état de vos commandes et laissez des avis sur vos produits</p>
        </div>

        {/* Statistiques */}
        <div className="stats-cards">
          <div className="stat-card">
            <h3>Total des commandes</h3>
            <div className="stat-value">{orders.length}</div>
          </div>
          <div className="stat-card">
            <h3>En cours</h3>
            <div className="stat-value">
              {orders.filter((o) => ["ordered", "processing"].includes(o.status)).length}
            </div>
          </div>
          <div className="stat-card">
            <h3>En transit</h3>
            <div className="stat-value">{orders.filter((o) => o.status === "shipped").length}</div>
          </div>
          <div className="stat-card">
            <h3>Livrées</h3>
            <div className="stat-value">{orders.filter((o) => o.status === "delivered").length}</div>
          </div>
        </div>

        {/* Recherche */}
        <div className="search-container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="search-icon"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input type="search" placeholder="Rechercher une commande..." className="search-input" />
        </div>

        {/* Onglets de statut */}
        <div className="status-tabs">
          <button
            className={`tab-button ${selectedTab === "all" ? "active" : ""}`}
            onClick={() => setSelectedTab("all")}
          >
            Toutes
          </button>
          <button
            className={`tab-button ${selectedTab === "ordered" ? "active" : ""}`}
            onClick={() => setSelectedTab("ordered")}
          >
            Commandées
          </button>
          <button
            className={`tab-button ${selectedTab === "processing" ? "active" : ""}`}
            onClick={() => setSelectedTab("processing")}
          >
            En préparation
          </button>
          <button
            className={`tab-button ${selectedTab === "shipped" ? "active" : ""}`}
            onClick={() => setSelectedTab("shipped")}
          >
            En transit
          </button>
          <button
            className={`tab-button ${selectedTab === "delivered" ? "active" : ""}`}
            onClick={() => setSelectedTab("delivered")}
          >
            Livrées
          </button>
          <button
            className={`tab-button ${selectedTab === "cancelled" ? "active" : ""}`}
            onClick={() => setSelectedTab("cancelled")}
          >
            Annulées
          </button>
        </div>

        {/* Liste des commandes */}
        <div className="orders-list">
          {filteredOrders.length === 0 ? (
            <div className="empty-orders">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="empty-icon"
              >
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
              </svg>
              <p className="empty-title">Aucune commande trouvée</p>
              <p className="empty-subtitle">Vous n'avez pas encore de commandes dans cette catégorie</p>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <div className="order-info">
                    <div className="order-title">
                      <h3>Commande #{order.id}</h3>
                      {renderStatus(order.status)}
                    </div>
                    <p className="order-date">Passée le {order.date}</p>
                  </div>
                  <div className="order-actions">
                    <p className="order-total">{order.total}</p>
                    <button className="details-button" onClick={() => openOrderDetails(order)}>
                      Détails
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="9 18 15 12 9 6"></polyline>
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Aperçu des produits */}
                <div className="order-products">
                  {order.items.slice(0, 3).map((item, index) => (
                    <div key={index} className="product-preview">
                      <img src={item.image || "/placeholder.svg"} alt={item.name} className="product-image" />
                      <div className="product-info">
                        <p className="product-name">{item.name}</p>
                        <p className="product-quantity">Qté: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                  {order.items.length > 3 && (
                    <div className="more-products">
                      <span className="more-badge">+{order.items.length - 3} autres produits</span>
                    </div>
                  )}
                </div>

                {/* Barre de progression */}
                {order.status !== "cancelled" && (
                  <div className="progress-container">
                    <div className="progress-bar" style={{ width: `${calculateOrderProgress(order)}%` }}></div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal de détails de commande */}
      {selectedOrder && (
        <div className="modal-overlay" onClick={closeOrderDetails}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Détails de la commande {selectedOrder.id}</h2>
              <p>Commande passée le {selectedOrder.date}</p>
              <button className="close-button" onClick={closeOrderDetails}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div className="modal-body">
              {/* Progression de la commande */}
              {selectedOrder.status !== "cancelled" && (
                <div className="order-progress-section">
                  <h3>Progression de la commande</h3>
                  <div className="progress-container">
                    <div className="progress-bar" style={{ width: `${calculateOrderProgress(selectedOrder)}%` }}></div>
                  </div>
                  <div className="progress-steps">
                    <div className={`progress-step ${selectedOrder.status === "ordered" ? "active" : ""}`}>
                      Commandée
                    </div>
                    <div className={`progress-step ${selectedOrder.status === "processing" ? "active" : ""}`}>
                      En préparation
                    </div>
                    <div className={`progress-step ${selectedOrder.status === "shipped" ? "active" : ""}`}>
                      En transit
                    </div>
                    <div className={`progress-step ${selectedOrder.status === "delivered" ? "active" : ""}`}>
                      Livrée
                    </div>
                  </div>
                </div>
              )}

              {/* Chronologie de la commande */}
              <div className="timeline-section">
                <h3>Chronologie</h3>
                <div className="timeline">
                  {selectedOrder.timeline.map((event, index) => (
                    <div key={index} className="timeline-event">
                      <div className="timeline-marker">
                        <div className="timeline-dot"></div>
                        {index < selectedOrder.timeline.length - 1 && <div className="timeline-line"></div>}
                      </div>
                      <div className="timeline-content">
                        <p className="timeline-message">{event.message}</p>
                        <p className="timeline-date">{event.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Informations de livraison */}
              <div className="delivery-info-section">
                <div className="delivery-address">
                  <h3>Adresse de livraison</h3>
                  <p>{selectedOrder.address}</p>
                </div>
                <div className="shipping-info">
                  <h3>Informations de livraison</h3>
                  {selectedOrder.trackingNumber ? (
                    <>
                      <p>Transporteur: {selectedOrder.carrier}</p>
                      <p>Numéro de suivi: {selectedOrder.trackingNumber}</p>
                      <p>Livraison estimée: {selectedOrder.estimatedDelivery || "Non disponible"}</p>
                      {selectedOrder.actualDelivery && <p>Livré le: {selectedOrder.actualDelivery}</p>}
                    </>
                  ) : (
                    <p>Informations de suivi non disponibles</p>
                  )}
                </div>
              </div>

              {/* Produits commandés */}
              <div className="ordered-products-section">
                <h3>Produits commandés</h3>
                <div className="ordered-products-list">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="ordered-product">
                      <img src={item.image || "/placeholder.svg"} alt={item.name} className="ordered-product-image" />
                      <div className="ordered-product-details">
                        <h4>{item.name}</h4>
                        <div className="ordered-product-info">
                          <div>
                            <p className="product-quantity-detail">Quantité: {item.quantity}</p>
                            <p className="product-price">{item.price}</p>
                          </div>
                          <div className="product-actions">
                            {selectedOrder.status === "delivered" && !item.reviewed && (
                              <button className="review-button" onClick={() => openReviewDialog(item)}>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                </svg>
                                Évaluer
                              </button>
                            )}
                            {selectedOrder.status === "delivered" && item.reviewed && (
                              <span className="reviewed-badge">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="14"
                                  height="14"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                </svg>
                                Évalué
                              </span>
                            )}
                            {selectedOrder.status === "delivered" && (
                              <button className="report-button" onClick={() => openReportDialog(item)}>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                                  <line x1="12" y1="9" x2="12" y2="13"></line>
                                  <line x1="12" y1="17" x2="12" y2="17"></line>
                                </svg>
                                Signaler
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Informations de paiement */}
              <div className="payment-info-section">
                <h3>Méthode de paiement</h3>
                <p>{selectedOrder.payment}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal pour laisser un commentaire */}
      {reviewDialogOpen && (
        <div className="modal-overlay" onClick={() => setReviewDialogOpen(false)}>
          <div className="modal-content review-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Évaluer votre produit</h2>
              <p>Partagez votre expérience avec {reviewProduct?.name}</p>
              <button className="close-button" onClick={() => setReviewDialogOpen(false)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div className="modal-body">
              <div className="review-form">
                <div className="rating-container">
                  <h3>Note</h3>
                  <div className="star-rating">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button key={star} type="button" onClick={() => setRating(star)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill={star <= rating ? "currentColor" : "none"}
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className={star <= rating ? "star-filled" : "star-empty"}
                        >
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                        </svg>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="review-text-container">
                  <textarea
                    placeholder="Partagez votre avis sur ce produit..."
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    rows={4}
                    className="review-textarea"
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="cancel-button" onClick={() => setReviewDialogOpen(false)}>
                Annuler
              </button>
              <button className="submit-button" onClick={submitReview} disabled={rating === 0 || !reviewText.trim()}>
                Envoyer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal pour signaler un problème */}
      {reportDialogOpen && (
        <div className="modal-overlay" onClick={() => setReportDialogOpen(false)}>
          <div className="modal-content report-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Signaler un problème</h2>
              <p>Signalez un problème avec {reportProduct?.name}</p>
              <button className="close-button" onClick={() => setReportDialogOpen(false)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div className="modal-body">
              <div className="report-form">
                <div className="report-reason-container">
                  <h3>Raison du signalement</h3>
                  <div className="report-options">
                    <label className="report-option">
                      <input
                        type="radio"
                        name="reportReason"
                        value="Produit défectueux"
                        onChange={(e) => setReportReason(e.target.value)}
                      />
                      <span>Produit défectueux</span>
                    </label>
                    <label className="report-option">
                      <input
                        type="radio"
                        name="reportReason"
                        value="Ne correspond pas à la description"
                        onChange={(e) => setReportReason(e.target.value)}
                      />
                      <span>Ne correspond pas à la description</span>
                    </label>
                    <label className="report-option">
                      <input
                        type="radio"
                        name="reportReason"
                        value="Pièces manquantes"
                        onChange={(e) => setReportReason(e.target.value)}
                      />
                      <span>Pièces manquantes</span>
                    </label>
                    <label className="report-option">
                      <input
                        type="radio"
                        name="reportReason"
                        value="Autre"
                        onChange={(e) => setReportReason(e.target.value)}
                      />
                      <span>Autre</span>
                    </label>
                  </div>
                </div>
                <div className="report-text-container">
                  <textarea
                    placeholder="Décrivez le problème en détail..."
                    value={reportReason === "Autre" ? reportReason : ""}
                    onChange={(e) => setReportReason(e.target.value)}
                    rows={4}
                    className="report-textarea"
                    disabled={reportReason !== "Autre"}
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="cancel-button" onClick={() => setReportDialogOpen(false)}>
                Annuler
              </button>
              <button className="submit-button" onClick={submitReport} disabled={!reportReason.trim()}>
                Envoyer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ClientOrderTracking
